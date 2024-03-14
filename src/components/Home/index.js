import {Component} from 'react'
import {HiSearch} from 'react-icons/hi'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'
import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    username: '',
    apiStatus: apiStatusConstants.initial,
    errMsg: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, fetchedData} = this.state
    const url = `https://apis2.ccbp.in/gpv/profile-details/${username}?api_key=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`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = {
        avatarUrl: data.avatar_url,
        login: data.login,
        name: data.name,
        description: data.bio,
        followers: data.followers,
        following: data.following,
        publicRepos: data.public_repos,
        company: data.company,
        companyUrl: data.organizations_url,
        location: data.location,
      }
      console.log(updatedData)
      this.setState({
        apiStatus: apiStatusConstants.success,
        errMsg: false,
        fetchedData: updatedData,
      })
      console.log(fetchedData)
    } else if (response.status === 400) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
        errMsg: true,
      })
    }
  }

  renderUserSuccess = event => (
    <div className="frame101">
      <div>
        <img src={event.avatarUrl} alt="avatarUrl" className="rectangle3" />
        <h1 className="user-login">{event.login}</h1>
        <p className="user-name">{event.name}</p>
        <p className="user-bio">{event.description}</p>
      </div>
      <div className="frame102">
        <div className="a">
          <h1 className="follow-text">{event.followers}</h1>
          <p className="follow">FOLLOWERS</p>
        </div>
        <vr className="line" />
        <div className="a">
          <h1 className="follow-text">{event.following}</h1>
          <p className="follow">FOLLOWING</p>
        </div>
        <vr className="line" />
        <div className="a">
          <h1 className="follow-text">{event.publicRepos}</h1>
          <p className="follow">PUBLICREPOS</p>
        </div>
      </div>

      <div className="frame103">
        <div className="b">
          <p className="p3">Company</p>
          <div className="c">
            <p>hii</p>
            <p className="p-3">{event.company}</p>
          </div>
        </div>

        <div className="b">
          <p className="p4">Company Url</p>
          <div className="c">
            <p>hii</p>
            <p className="p-4">{event.companyUrl}</p>
          </div>
        </div>

        <div>
          <p className="p5">Location</p>
          <div className="c">
            <p>hii</p>
            <p className="p-5">{event.location}</p>
          </div>
        </div>
      </div>
    </div>
  )

  renderUserInitial = () => (
    <div>
      <h1 className="h2">Github Profile Visualizer</h1>
      <img
        src="https://res.cloudinary.com/dbkzj0qgh/image/upload/v1708171679/Group_2_1_l0wx74.png"
        className="img1"
        alt="initial"
      />
    </div>
  )

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#3B82F6" height={50} width={50} />
    </div>
  )

  changes = () => {
    this.setState({
      apiStatus: apiStatusConstants.initial,
      errMsg: false,
      username: '',
    })
  }

  renderUserFailure = () => (
    <div>
      <h1 className="h2">Github Profile Visualizer</h1>
      <img
        src="https://res.cloudinary.com/dbkzj0qgh/image/upload/v1708172637/Group_7522_rchfok.png"
        className="img1"
        alt="failure"
      />
      <div className="btn-container">
        <button type="button" className="btn" onClick={this.changes}>
          Try again
        </button>
      </div>
    </div>
  )

  renderView = () => {
    const {apiStatus, fetchedData} = this.state
    switch (apiStatus) {
      case apiStatusConstants.initial:
        return this.renderUserInitial()
      case apiStatusConstants.success:
        return this.renderUserSuccess(fetchedData)
      case apiStatusConstants.failure:
        return this.renderUserFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {username, errMsg} = this.state
    return (
      <div className="bg-container">
        <Header />
        <form onSubmit={this.submitForm}>
          <div className="frame">
            <input
              type="text"
              className="frame1"
              placeholder="Enter github username"
              value={username}
              onChange={this.onChangeUsername}
            />
            <button type="submit" label="Search" className="frame2">
              <HiSearch className="search-icon" />
            </button>
            {errMsg ? (
              <p className="p1">Enter the valid github username</p>
            ) : null}
          </div>
        </form>
        <div className="viewState">{this.renderView()}</div>
      </div>
    )
  }
}

export default Home
