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
    description?: string;

    /** Natura Lines */
    details?: NaturaLine[];
    unit?: Unit;
    cabang?: Cabang;
  };

  // Natura Line Table
  type NaturaLine = {
    /** Unique ID */
    id?: string;
    /** From NaturaHeader.ID */
    natura_header_id?: string;
    /** From Akun.ID */
    akun_id?: string;
    akun_acc?: string;
    /** From Nik.ID */
    nik_id?: string;
    nik_num?: string;
    total_qty?: number;
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

    nik?: Nik;
    akun?: Akun;
  };

  type NaturaRecon = {
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
    /** Total Oracle Amount Natura */
    totalOra?: number;
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

  type ReportReconForm = {
    /** From Kelompok.ID */
    kelompok_id?: string;
    /** From Akun.ID */
    akun_id?: string;
    /** From Unit.ID */
    unit_id?: string;
    /** From Cabang.ID */
    cabang_id?: string;
    /** Period Natura */
    period?: string;
    /** ID Natura */
    id_natura?: string;
    /** Status of nik (New = 0, Proccess = 1, Error = -1, Finish = 2, Reject = -2) */
    status?: number;
    selisihChecked?: boolean;
  };

  type ReportPenghasilanForm = {
    /** From Kelompok.ID */
    kelompok_id?: string;
    /** From Akun.ID */
    akun_id?: string;
    /** From Unit.ID */
    unit_id?: string;
    /** From Cabang.ID */
    cabang_id?: string;
    /** Period Natura */
    period?: string;
    /** ID Natura */
    id_natura?: string;
    /** Status of nik (New = 0, Proccess = 1, Error = -1, Finish = 2, Reject = -2) */
    status?: number;
    tampilan?: string;
  };

  type ReportPerincianForm = {
    /** ID Natura */
    id_natura?: string;
  };

  type ReportDPPNForm = {
    /** From Kelompok.ID */
    kelompok_id?: string;
    /** From Akun.ID */
    akun_id?: string;
    /** From Unit.ID */
    unit_id?: string;
    /** From Cabang.ID */
    cabang_id?: string;
  };

  // Tabel Header Tampungan Data Cars
  type CarsHeader = {
    /** Unique ID */
    id?: string;
    /** Document Number */
    document_num?: string;
    /** ID Natura Cars */
    id_natura?: string;
    /** Program Source (Cars) */
    program?: string;
    /** Transaction Date */
    trx_date?: string;
    /** Unit Code (IPT/ICC/IPP etc.) */
    unit_code?: string;
    /** Unit Name */
    unit_name?: string;
    /** Branch Code (G001/G010 etc.) */
    branch_code?: string;
    /** Branch Name (JAKARTA 1/SEMARANG etc.) */
    branch_name?: string;
    /** Status of api (New = 0, Proccess = 1, Error = -1) */
    status?: number;
    /** Create time */
    created_at?: string;
    /** Update time */
    updated_at?: string;
    statusChecked?: boolean;
  };

  // Tabel Header Tampungan Data File Upload
  type TampFileHeader = {
    /** Unique ID */
    id?: string;
    /** Nama File */
    nama_file?: string;
    /** Program Source (Cars) */
    program?: string;
    /** Unit Code (IPT/ICC/IPP etc.) */
    unit_code?: string;
    /** Unit Name */
    unit_name?: string;
    /** Branch Code (G001/G010 etc.) */
    branch_code?: string;
    /** Branch Name (JAKARTA 1/SEMARANG etc.) */
    branch_name?: string;
    /** Total Line */
    total_line?: number;
    /** Size File */
    size_file?: string;
    /** Status of api (New = 0, Proccess = 1, Error = -1) */
    status?: number;
    /** Create time */
    created_at?: string;
    /** Update time */
    updated_at?: string;
    statusChecked?: boolean;
  };

  // Tabel File Upload
  type UploadFile = {
    /** File Upload */
    file_upload: File;
  };

  // Table Batch for processed Natura
  type NaturaProcessBatch = {
    /** Unique ID */
    id?: string;
    /** Batch Number */
    batch_number?: string;
    /** Period Natura */
    period?: string;
    /** Description Header Natura */
    description?: string;
    /** Batch Status */
    status?: number;
    /** Send Date Natura */
    send_date?: string;
    /** Create time */
    created_at?: string;
    /** Update time */
    updated_at?: string;
    statusChecked?: boolean;
  };

  // Table Header for processed Natura
  type NaturaProcessHeader = {
    /** Unique ID */
    id?: string;
    /** from NaturaProcessBatch.ID */
    natura_process_batch_id?: string;
    /** NIK Employee */
    nik?: string;
    /** Name Employee */
    name?: string;
    /** Total Amount Natura */
    total_amount?: number;
    /** Create time */
    created_at?: string;
    /** Update time */
    updated_at?: string;
  };

  // Table Lines for processed Natura
  type NaturaProcessLine = {
    /** Unique ID */
    id?: string;
    /** from NaturaProcessHeader.ID */
    natura_process_header_id?: string;
    /** ID Natura */
    id_natura?: string;
    /** Unit Code (IPT/ICC/IPP etc.) */
    unit_code?: string;
    /** Unit Name */
    unit_name?: string;
    /** Branch Code (G001/G010 etc.) */
    branch_code?: string;
    /** Branch Name (JAKARTA 1/SEMARANG etc.) */
    branch_name?: string;
    /** Account Natura */
    account?: string;
    /** Account Name Natura */
    account_name?: string;
    /** Amount Natura */
    amount?: number;
    /** Description Natura Detail */
    description?: string;
    /** From NaturaHeader.ID */
    natura_header_id?: string;
    /** From NaturaLine.ID */
    natura_line_id?: string;
    /** Transaction Date Natura */
    trx_date?: string;
    /** Create time */
    created_at?: string;
    /** Update time */
    updated_at?: string;
  };
}
