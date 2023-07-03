export default function Tabs({tabs}){
    return (
        <div>
            {tabs.map((tabName, index) => (
                <span key={index}>{tabName}</span>
            ))}
        </div>
    )
}