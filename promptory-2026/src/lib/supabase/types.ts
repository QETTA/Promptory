export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type ProductStatus = "draft" | "published";
export type ProductType = "automation_system" | "template_bundle" | "prompt_pack";
export type OrderStatus = "draft" | "pending_payment" | "paid" | "cancelled";

export interface Database {
  public: {
    Tables: {
      downloads: {
        Row: {
          buyer_id: string;
          created_at: string;
          download_count: number;
          id: string;
          last_downloaded_at: string | null;
          order_id: string;
          product_id: string;
          updated_at: string;
        };
        Insert: {
          buyer_id: string;
          created_at?: string;
          download_count?: number;
          id?: string;
          last_downloaded_at?: string | null;
          order_id: string;
          product_id: string;
          updated_at?: string;
        };
        Update: {
          buyer_id?: string;
          created_at?: string;
          download_count?: number;
          id?: string;
          last_downloaded_at?: string | null;
          order_id?: string;
          product_id?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      optimization_runs: {
        Row: {
          channel_kind: string;
          channel_label: string;
          created_at: string;
          focus_title: string | null;
          id: string;
          query_string: string;
          raw_url: string;
          recommended_category: string | null;
          state_key: string;
          summary_note: string | null;
          title: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          channel_kind: string;
          channel_label: string;
          created_at?: string;
          focus_title?: string | null;
          id?: string;
          query_string: string;
          raw_url: string;
          recommended_category?: string | null;
          state_key: string;
          summary_note?: string | null;
          title: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          channel_kind?: string;
          channel_label?: string;
          created_at?: string;
          focus_title?: string | null;
          id?: string;
          query_string?: string;
          raw_url?: string;
          recommended_category?: string | null;
          state_key?: string;
          summary_note?: string | null;
          title?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      orders: {
        Row: {
          amount_krw: number;
          buyer_id: string;
          created_at: string;
          id: string;
          payment_provider: string;
          payment_reference: string | null;
          product_id: string;
          seller_id: string;
          status: OrderStatus;
          updated_at: string;
        };
        Insert: {
          amount_krw: number;
          buyer_id: string;
          created_at?: string;
          id?: string;
          payment_provider?: string;
          payment_reference?: string | null;
          product_id: string;
          seller_id: string;
          status?: OrderStatus;
          updated_at?: string;
        };
        Update: {
          amount_krw?: number;
          buyer_id?: string;
          created_at?: string;
          id?: string;
          payment_provider?: string;
          payment_reference?: string | null;
          product_id?: string;
          seller_id?: string;
          status?: OrderStatus;
          updated_at?: string;
        };
        Relationships: [];
      };
      products: {
        Row: {
          category: string;
          created_at: string;
          description: string;
          file_path: string | null;
          id: string;
          keywords: string[];
          preview_points: string[];
          price_krw: number;
          product_type: ProductType;
          seller_id: string;
          setup_minutes: number;
          slug: string;
          status: ProductStatus;
          thumbnail_url: string | null;
          title: string;
          updated_at: string;
        };
        Insert: {
          category: string;
          created_at?: string;
          description: string;
          file_path?: string | null;
          id?: string;
          keywords?: string[];
          preview_points?: string[];
          price_krw: number;
          product_type?: ProductType;
          seller_id: string;
          setup_minutes?: number;
          slug: string;
          status?: ProductStatus;
          thumbnail_url?: string | null;
          title: string;
          updated_at?: string;
        };
        Update: {
          category?: string;
          created_at?: string;
          description?: string;
          file_path?: string | null;
          id?: string;
          keywords?: string[];
          preview_points?: string[];
          price_krw?: number;
          product_type?: ProductType;
          seller_id?: string;
          setup_minutes?: number;
          slug?: string;
          status?: ProductStatus;
          thumbnail_url?: string | null;
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          created_at: string;
          display_name: string | null;
          id: string;
          seller_bio: string | null;
          updated_at: string;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string;
          display_name?: string | null;
          id: string;
          seller_bio?: string | null;
          updated_at?: string;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string;
          display_name?: string | null;
          id?: string;
          seller_bio?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

export type ProductRow = Database["public"]["Tables"]["products"]["Row"];
export type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];
export type OrderRow = Database["public"]["Tables"]["orders"]["Row"];
export type DownloadRow = Database["public"]["Tables"]["downloads"]["Row"];
export type OptimizationRunRow = Database["public"]["Tables"]["optimization_runs"]["Row"];
