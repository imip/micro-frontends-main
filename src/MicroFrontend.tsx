import React from 'react';

interface Props {
  name: string,
  document?: any,
  textValue?: string;
  setTextValue?: (val: string) => void;
}

class MicroFrontend extends React.Component<Props, {}> {
  componentDidMount() {
    const { name } = this.props;

    if (document.getElementById(`${name}-script`)) {
      this.renderMicroFrontend();
      return;
    } else {
      console.log("ko")
    }
  }

  componentWillMount() {
    const scriptId = `${this.props.name}`;
    if (!document.getElementById(`${scriptId}-container`)) {
      const div = document.createElement("div");
      div.id = `${scriptId}-container`
      document.body.appendChild(div)

      const script = document.createElement('script');
      script.id = `${scriptId}-script`;
      script.crossOrigin = '';
      script.src = `http://127.0.0.1/${scriptId}/index.js`;
      script.onload = this.renderMicroFrontend;
      document.head.appendChild(script);
    }
  }

  componentWillUnmount() {
    const { name } = this.props;
    (window as any)[`unmount${name}`](`${name}-container`);
  }

  renderMicroFrontend = () => {
    const { name, textValue, setTextValue } = this.props;
    // @ts-ignore
    if ((window as any)[`render${name}`]) {
      (window as any)[`render${name}`](`${name}-container`, { textValue, setTextValue });
    }
  };

  render() {
    return <main id={`${this.props.name}-container`} />;
  }
}

export default MicroFrontend;