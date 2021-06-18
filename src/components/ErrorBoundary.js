import { Component } from "react";
import { Link, Redirect } from 'react-router-dom';

class ErrorBoundary extends Component {
  state = {
    hasError: false,
    redirect: false
  }

  // Can recieve the error object as argument
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error(`ErrorBroundary caught an error: ${error}`, info);
    setTimeout(() => {
      this.setState({ redirect: true });
    }, 5000);
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />
    }

    if (this.state.hasError) {
      return (
        <h1>This listing has an error. <Link to="/">Click here</Link> to go back to the home page or wait five seconds.</h1>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
