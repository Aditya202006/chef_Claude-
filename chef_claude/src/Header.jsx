import chef_claude_logo from './images/chef-claude-icon.png';

export default function Header() {
    return (
        <header className="header">
            <div className="header-content">
                <img src={chef_claude_logo} alt="Chef Claude logo" />
                <h1>Chef Claude</h1>
            </div>
        </header>
    )
}