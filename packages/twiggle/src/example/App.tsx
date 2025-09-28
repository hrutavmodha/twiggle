import Route from '../router/Route'
import Routes from '../router/Routes'
import Home from './Home'
import About from './About'
import Service from './Service'

export default function App() {
    <Routes>
        <Route to='/' element={<Home />} />
        <Route to='/about' element={<About />} />
        <Route to='/home' element={<Service />} />
    </Routes>
}