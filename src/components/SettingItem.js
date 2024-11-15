export const SettingItem =({label,children}) => {
    return (
        <div className="row mb-2">
            <div className="col-sm-5 border pt-1 pb-1">{label}</div>
            <div className="col-sm-7 border pt-1 pb-1">
                {children}
            </div>
        </div>
     )
}