export const SettingItem =({label,children}) => {
    return (
        <div className="row mb-3">
            <label className="col-sm-3 col-form-label">{label}</label>
            <div className="col-sm-9">
                {children}
            </div>
        </div>
     )
}