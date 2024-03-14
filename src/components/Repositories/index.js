import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'
import Header from '../Header'

class Repositories extends Component {
  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    const apiUrl = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    return (
      <div className="bg-container">
        <Header />
        <div className="c-c">
          <h1 className="h">Repositories</h1>
        </div>
      </div>
    )
  }
}

export default Repositories
