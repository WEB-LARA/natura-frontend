declare namespace API {
  type Unit = {
    /** Unique ID */
    id?: string;
    /** Code of Code (unique for same parent) */
    code?: string;
    /** Display name of Tes */
    name?: string;
    /** Sequence for sorting */
    sequence?: number;
    /** Status of unit (disabled, enabled) */
    status?: string;
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
    /** ID of Unit */
    unit_id?: string;
    /** Display name of Cabang */
    name?: string;
    /** Sequence for sorting */
    sequence?: number;
    /** Status of unit (disabled, enabled) */
    status?: string;
    /** Create time */
    created_at?: string;
    /** Update time */
    updated_at?: string;
    statusChecked?: boolean;
    /** Unit */
    unit?: Unit;
  };
}
