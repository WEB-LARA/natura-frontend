declare namespace API {
  // Table Header AP for Data from Oracle
  type OracleAp = {
    /** Unique ID */
    id?: string;
    /** Document Number */
    document_num?: string;
    /** ID Natura Oracles */
    id_natura?: string;
    /** Program Source (Oracles) */
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
    /** Account Natura */
    account?: string;
    /** Amount Oracles */
    amount?: number;
    /** Status of api (New = 0, Proccess = 1, Error = -1) */
    status?: number;
    /** Create time */
    created_at?: string;
    /** Update time */
    updated_at?: string;
    statusChecked?: boolean;

    /** Oracle AP Lines */
    details?: OracleApLine[];
  };

  // Tabel Lines Tampungan Data Oracle ga ada NIK
  type OracleApLine = {
    /** Unique ID */
    id?: string;
    /** From OracleAp.ID */
    oracle_ap_id?: string;
    /** Nik Employee */
    nik_num?: string;
    nik?: string;
    /** Description Oracles Line */
    description?: string;
    /** Amount Oracles */
    amount?: number;
    /** Create time */
    created_at?: string;
    /** Update time */
    updated_at?: string;
  };

  // Table Header GL per NIK for Data from Oracle
  type OracleGlNik = {
    /** Unique ID */
    id?: string;
    /** Document Number */
    document_num?: string;
    /** ID Natura from Oracle */
    id_natura?: string;
    /** Program Source */
    program?: string;
    /** Transaction Date */
    trx_date?: string;
    /** Period Natura Oracle */
    period?: string;
    /** Sent Date Oracle to Web Natura */
    sent_date?: string;
    /** Unit Code (IPT/ICC/IPP etc.) */
    unit_code?: string;
    /** Branch Code */
    branch_code?: string;
    /** Status Natura Oracle */
    status?: number;
    /** Create time */
    created_at?: string;
    /** Update time */
    updated_at?: string;
    statusChecked?: boolean;
    /** tamp */
    account?: string;
    amount?: number;
    unit_name?: string;
    branch_name?: string;
  };

  // Table GL Lines for Data from Oracle
  type OracleGlNikLine = {
    /** Unique ID */
    id?: string;
    /** From OracleGlNik.ID */
    oracle_gl_nik_id?: string;
    /** Nik Employee */
    nik?: string;
    /** Account Natura */
    account?: string;
    /** Description Lines */
    description?: string;
    /** Amount Oracle */
    amount?: number;
    /** Create time */
    created_at?: string;
    /** Update time */
    updated_at?: string;

    akun?: Akun;
  };

  // Table Header GL for Data from Oracle
  type OracleGl = {
    /** Unique ID */
    id?: string;
    /** Document Number */
    document_num?: string;
    /** ID Natura Oracles */
    id_natura?: string;
    /** Program Source (Oracles) */
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
    /** Account Natura */
    account?: string;
    /** Amount Oracles */
    amount?: number;
    /** Status of api (New = 0, Proccess = 1, Error = -1) */
    status?: number;
    /** Create time */
    created_at?: string;
    /** Update time */
    updated_at?: string;
    statusChecked?: boolean;

    /** Oracle GL Lines */
    details?: OracleGlLine[];
  };

  // Tabel Lines Tampungan Data Oracle ga ada NIK
  type OracleGlLine = {
    /** Unique ID */
    id?: string;
    /** From OracleAp.ID */
    oracle_gl_id?: string;
    /** Nik Employee diisi manual */
    nik?: string;
    /** Description Oracles Line */
    description?: string;
    /** Amount Oracles */
    amount?: number;
    /** Create time */
    created_at?: string;
    /** Update time */
    updated_at?: string;
  };

  type ErrLine = {
    /** Unique ID */
    id?: string;
    /** From OracleAp.ID */
    header_id?: string;
    /** Description Oracles Line */
    description?: string;
    /** Create time */
    created_at?: string;
    /** Update time */
    updated_at?: string;
  };

  type OracleReturnProccess = {
    oracle_ap_jml?: number;
    oracle_gl_jml?: number;
    oracle_gl_nik_jml?: number;
    cars_jml?: number;
  };
}
