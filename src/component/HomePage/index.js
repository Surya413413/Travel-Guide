import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {
  CustomHomeContainer,
  CustomDetailsContainer,
  CustomImage,
  CustomAllContainer,
  CustomHeading,
  CustomNameHeading,
} from './styledComponent'

const statusContants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
}

class HomePage extends Component {
  state = {listData: [], status: statusContants.initial}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({status: statusContants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/tg/packages'
    const option = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, option)
    const data = await response.json()
    const formateData = data.packages.map(each => ({
      id: each.id,
      name: each.name,
      imageUrl: each.image_url,
      description: each.description,
    }))
    this.setState({listData: formateData})
    this.setState({status: statusContants.success})
  }

  renderLoading = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderData = () => {
    const {listData} = this.state
    return (
      <CustomAllContainer>
        {listData.map(each => (
          <CustomDetailsContainer key={each.id}>
            <CustomImage src={each.imageUrl} alt={each.name}/>
            <CustomNameHeading>{each.name}</CustomNameHeading>
            <p>{each.description}</p>
          </CustomDetailsContainer>
        ))}
      </CustomAllContainer>
    )
  }

  renderFinalResult = () => {
    const {status} = this.state

    switch (status) {
      case statusContants.inProgress:
        return this.renderLoading()
      case statusContants.success:
        return this.renderData()
      default:
        return null
    }
  }

  render() {
    const {listData} = this.state
    return (
      <CustomHomeContainer>
        <CustomHeading>Travel Guide</CustomHeading>
        {this.renderFinalResult()}
      </CustomHomeContainer>
    )
  }
}
export default HomePage
