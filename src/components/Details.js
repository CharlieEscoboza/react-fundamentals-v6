import { Component } from "react";
import { withRouter } from 'react-router-dom';
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";
import Modal from "./Modal";

class Details extends Component {
  state = { loading: true, showModal: false };

  async componentDidMount() {
    const resp = await fetch(`http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`);
    const json = await resp.json();

    this.setState(Object.assign({
      loading: false
    }, json.pets[0]));
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  }

  adopt = () => window.location = 'http://bit.ly/pet-adopt';

  render() {
    const { animal, breed, city, state, description, name, images, showModal } = this.state;

    return (
      <div>
        <Carousel images={images} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${city}, ${state}`}</h2>
          <ThemeContext.Consumer>
            {([theme]) => (
              <button onClick={this.toggleModal} style={{ backgroundColor: theme }}>Adopt {name}</button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>

          {showModal ? (
            <Modal>
              <ThemeContext.Consumer>
                {([theme]) => (
                  <div>
                    <h1>Would you like to adopt {name}</h1>
                    <div>
                      <button style={{ backgroundColor: theme }} onClick={this.adopt}>Yes!</button>
                      <button style={{ backgroundColor: theme }} onClick={this.toggleModal}>No</button>
                    </div>
                  </div>
                )}
              </ThemeContext.Consumer>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

const DetailsWithRouter = withRouter(Details);

export default function DetailsWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <DetailsWithRouter />
    </ErrorBoundary>
  );
};
