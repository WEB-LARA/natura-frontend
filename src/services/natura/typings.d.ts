declare namespace API {
  // Natura Header Table
  type NaturaHeader = {
    /** Unique ID */
    id?: string;
    /** From User.ID */
    user_id?: string;
    /** From Kelompok.ID */
    kelompok_id?: string;
    /** From Unit.ID */
    unit_id?: string;
    /** From Cabang.ID */
    cabang_id?: string;
    /** Period Natura */
    period?: string;
    /** ID Natura */
    id_natura?: string;
    /** Description Header Natura */
    description?: string;
    /** Total Amount Natura */
    total?: number;
    /** Flag Validate */
    flag_validate?: boolean;
    /** Status of nik (New = 0, Proccess = 1, Error = -1, Finish = 2, Reject = -2) */
    status?: number;
    /** Attachment Natura */
    attachment?: string;
    /** Flag Cancel */
    flag_cancel?: boolean;
    /** SoftDelete */
    soft_delete?: boolean;
    /** Create time */
    created_at?: string;
    /** Update time */
    updated_at?: string;
    statusChecked?: boolean;

    /** Natura Lines */
    details?: NaturaLine[];
  };

  // Natura Line Table
  type NaturaLine = {
    /** Unique ID */
    id?: string;
    /** From NaturaHeader.ID */
    natura_header_id?: string;
    /** From Akun.ID */
    akun_id?: string;
    /** From Nik.ID */
    nik_id?: string;
    /** Amount Natura */
    amount?: number;
    /** Amount Budget Natura */
    amount_budget?: number;
    /** Amount Adjustment Natura (Net with Amount) */
    amount_adj?: number;
    /** Amount Final Natura */
    amount_final?: number;
    /** Transaction Date Natura */
    trx_date?: string;
    /** Description Natura Detail */
    description?: string;
    /** Status */
    status?: number;
    /** Create time */
    created_at?: string;
    /** Update time */
    updated_at?: string;
    statusChecked?: boolean;
  };
}
