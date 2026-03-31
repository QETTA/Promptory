create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  avatar_url text,
  seller_bio text,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid not null references public.profiles (id) on delete cascade,
  title text not null,
  slug text not null unique,
  description text not null,
  price_krw integer not null check (price_krw >= 1000),
  thumbnail_url text,
  file_path text,
  category text not null default 'automation',
  keywords text[] not null default '{}',
  product_type text not null default 'automation_system' check (
    product_type in ('automation_system', 'template_bundle', 'prompt_pack')
  ),
  preview_points text[] not null default '{}',
  setup_minutes integer not null default 15 check (setup_minutes >= 1 and setup_minutes <= 1440),
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  buyer_id uuid not null references public.profiles (id) on delete cascade,
  product_id uuid not null references public.products (id) on delete cascade,
  seller_id uuid not null references public.profiles (id) on delete cascade,
  amount_krw integer not null check (amount_krw >= 1000),
  payment_provider text not null default 'toss',
  payment_reference text,
  status text not null default 'draft' check (status in ('draft', 'pending_payment', 'paid', 'cancelled')),
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

create table if not exists public.downloads (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null unique references public.orders (id) on delete cascade,
  buyer_id uuid not null references public.profiles (id) on delete cascade,
  product_id uuid not null references public.products (id) on delete cascade,
  download_count integer not null default 0,
  last_downloaded_at timestamptz,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

create table if not exists public.optimization_runs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  title text not null,
  raw_url text not null,
  channel_kind text not null,
  channel_label text not null,
  query_string text not null,
  state_key text not null,
  focus_title text,
  recommended_category text,
  summary_note text,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now()),
  unique (user_id, state_key)
);

create index if not exists optimization_runs_user_updated_at_idx
on public.optimization_runs (user_id, updated_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at before update on public.products
for each row execute function public.set_updated_at();

drop trigger if exists orders_set_updated_at on public.orders;
create trigger orders_set_updated_at before update on public.orders
for each row execute function public.set_updated_at();

drop trigger if exists downloads_set_updated_at on public.downloads;
create trigger downloads_set_updated_at before update on public.downloads
for each row execute function public.set_updated_at();

drop trigger if exists optimization_runs_set_updated_at on public.optimization_runs;
create trigger optimization_runs_set_updated_at before update on public.optimization_runs
for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, new.raw_user_meta_data ->> 'display_name')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.downloads enable row level security;
alter table public.optimization_runs enable row level security;

grant usage on schema public to anon, authenticated, service_role;
grant select on public.products to anon;
grant select on public.profiles to authenticated;
grant update on public.profiles to authenticated;
grant select, insert, update on public.products to authenticated;
grant select, insert on public.orders to authenticated;
grant select on public.downloads to authenticated;
grant select, insert, update on public.optimization_runs to authenticated;
grant all on public.profiles to service_role;
grant all on public.products to service_role;
grant all on public.orders to service_role;
grant all on public.downloads to service_role;
grant all on public.optimization_runs to service_role;

drop policy if exists "profiles readable by owner" on public.profiles;
create policy "profiles readable by owner" on public.profiles
for select using (auth.uid() = id);

drop policy if exists "profiles updatable by owner" on public.profiles;
create policy "profiles updatable by owner" on public.profiles
for update using (auth.uid() = id);

drop policy if exists "published products are public" on public.products;
create policy "published products are public" on public.products
for select using (status = 'published' or auth.uid() = seller_id);

drop policy if exists "seller can insert products" on public.products;
create policy "seller can insert products" on public.products
for insert with check (auth.uid() = seller_id);

drop policy if exists "seller can update products" on public.products;
create policy "seller can update products" on public.products
for update using (auth.uid() = seller_id);

drop policy if exists "buyers can read own orders" on public.orders;
create policy "buyers can read own orders" on public.orders
for select using (auth.uid() = buyer_id or auth.uid() = seller_id);

drop policy if exists "buyers can insert own orders" on public.orders;
create policy "buyers can insert own orders" on public.orders
for insert with check (auth.uid() = buyer_id);

drop policy if exists "buyers can read own downloads" on public.downloads;
create policy "buyers can read own downloads" on public.downloads
for select using (auth.uid() = buyer_id);

drop policy if exists "users can read own optimization runs" on public.optimization_runs;
create policy "users can read own optimization runs" on public.optimization_runs
for select using (auth.uid() = user_id);

drop policy if exists "users can insert own optimization runs" on public.optimization_runs;
create policy "users can insert own optimization runs" on public.optimization_runs
for insert with check (auth.uid() = user_id);

drop policy if exists "users can update own optimization runs" on public.optimization_runs;
create policy "users can update own optimization runs" on public.optimization_runs
for update using (auth.uid() = user_id);

insert into storage.buckets (id, name, public)
values ('product-thumbnails', 'product-thumbnails', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('product-files', 'product-files', false)
on conflict (id) do nothing;

drop policy if exists "public thumbnails readable" on storage.objects;
create policy "public thumbnails readable" on storage.objects
for select using (bucket_id = 'product-thumbnails');

drop policy if exists "sellers upload thumbnails" on storage.objects;
create policy "sellers upload thumbnails" on storage.objects
for insert to authenticated with check (
  bucket_id = 'product-thumbnails'
  and auth.uid()::text = (storage.foldername(name))[1]
);

drop policy if exists "sellers upload product files" on storage.objects;
create policy "sellers upload product files" on storage.objects
for insert to authenticated with check (
  bucket_id = 'product-files'
  and auth.uid()::text = (storage.foldername(name))[1]
);
