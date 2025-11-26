/**
 * Database Types
 * Auto-generated from Supabase schema
 * Last updated: 2025-11-26
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string | null;
          id: string;
          name: string;
          slug: string;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          name: string;
          slug: string;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          name?: string;
          slug?: string;
        };
      };
      products: {
        Row: {
          base_price: number | null;
          category_id: string;
          created_at: string | null;
          description: string | null;
          has_variants: boolean;
          id: string;
          image_url: string | null;
          is_available: boolean;
          name: string;
          unit_type: string;
          updated_at: string | null;
        };
        Insert: {
          base_price?: number | null;
          category_id: string;
          created_at?: string | null;
          description?: string | null;
          has_variants?: boolean;
          id?: string;
          image_url?: string | null;
          is_available?: boolean;
          name: string;
          unit_type: string;
          updated_at?: string | null;
        };
        Update: {
          base_price?: number | null;
          category_id?: string;
          created_at?: string | null;
          description?: string | null;
          has_variants?: boolean;
          id?: string;
          image_url?: string | null;
          is_available?: boolean;
          name?: string;
          unit_type?: string;
          updated_at?: string | null;
        };
      };
      product_variants: {
        Row: {
          created_at: string | null;
          id: string;
          is_available: boolean;
          price: number;
          product_id: string;
          variant_name: string;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          is_available?: boolean;
          price: number;
          product_id: string;
          variant_name: string;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          is_available?: boolean;
          price?: number;
          product_id?: string;
          variant_name?: string;
        };
      };
      settings: {
        Row: {
          id: string;
          key: string;
          updated_at: string | null;
          value: string;
        };
        Insert: {
          id?: string;
          key: string;
          updated_at?: string | null;
          value: string;
        };
        Update: {
          id?: string;
          key?: string;
          updated_at?: string | null;
          value?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
