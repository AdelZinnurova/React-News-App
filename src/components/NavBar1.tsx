export const NavBar1 = () => {
    return (
        <div>
            <a className="navbar-brand " href="/">
                NewsHub
            </a>
            <form>
                <input
                    type="text"
                    placeholder="Search for news"
                    className="search-input"
                />
            </form>
        </div>
    )
}