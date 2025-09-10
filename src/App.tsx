import './App.css'
import {NewsFeed} from "./components/NewsFeed.tsx";
import {Header} from "./components/Header.tsx";

function App() {
    return (
        <div className="container">
            <Header/>
            <NewsFeed/>
        </div>
    )
}

export default App
