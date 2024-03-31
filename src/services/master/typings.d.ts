declare namespace API {
  type Unit = {
    /** Unique ID */
    id?: string;
    /** Code of Code (unique for same parent) */
    code?: string;
    reference_id?: string;
    /** Display name of Tes */
    name?: string;
    /** Sequence for sorting */
    sequence?: number;
    /** Status of unit (disabled, enabled) */
    flag_active?: boolean;
    /** Create time */
    created_at?: string;
    /** Update time */
    updated_at?: string;
    statusChecked?: boolean;
  };

  type Cabang = {
    /** Unique ID */
    id?: string;
    /** Code of Cabang (unique for same parent) */
    code?: string;
    reference_id?: string;
    /** ID of Unit */
    unit_id?: string;
    /** Display name of Cabang */
    name?: string;
    /** Sequence for sorting */
    sequence?: number;
    /** Status of unit (disabled, enabled) */
    flag_active?: boolean;
    /** Create time */
    created_at?: string;
    /** Update time */
    updated_at?: string;
    statusChecked?: boolean;
    /** Unit */
    unit?: Unit;
  };

  // Master Nik management
  type Nik = {
    /** Unique ID */
    id?: string;
    /** From Unit.ID */
    unit_id?: string;
    /** From Cabang.ID */
    cabang_id?: string;
    /** Code of NIK (unique for same parent) */
    nik?: string;
    /** Display name of Name */
    name?: string;
    /** Total Amount Budget Makan */
    budget_makan?: number;
    /** Total Amount Budget Saku */
    budget_saku?: number;
    /** Code of NikOld (unique for same parent) */
    nik_old?: string;
    /** Status of nik (disabled = 0, enabled = 1) */
    flag_aktif?: boolean;
    /** Update time */
    updated_at_sd2?: string;
    /** Create time */
    created_at?: string;
    /** Update time */
    updated_at?: string;
    statusChecked?: boolean;
  };

  // Kelompok Natura
  type Kelompok = {
    /** Unique ID */
    id?: string;
    /** Kelompok Code */
    code?: string;
    /** Kelompok Name */
    name?: string;
    /** Flag Active */
    flag_active?: boolean;
    /** Create time */
    created_at?: string;
    /** Update time */
    updated_at?: string;
  };

  // Akun Kelompok Natura
  type Akun = {
    /** Unique ID */
    id?: string;
    /** From Kelompok.ID */
    kelompok_id?: string;
    /** Unit.ID Account Natura */
    unit_id?: string;
    /** Account Natura */
    account?: string;
    /** Account Name Natura */
    name?: string;
    /** Description Akun */
    description?: string;
    /** Limit Type (Bulan/Tahun) Natura */
    limit_type?: string;
    /** Limit Amount Natura */
    limit_amount?: number;
    /** Flag Tax Object */
    flag_tax_object?: boolean;
    /** Flag PUM */
    flag_pum?: boolean;
    /** Flag Template */
    flag_template?: boolean;
    /** Flag Active */
    flag_active?: boolean;
    /** Create time */
    created_at?: string;
    /** Update time */
    updated_at?: string;
    unit: Unit;
    kelompok: Kelompok;
  };
}
