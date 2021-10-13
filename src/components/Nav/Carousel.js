import React from 'react';
import './Carousel.scss';

class Carousel extends React.Component {
  constructor() {
    super();
    this.state = {
      currIndex: 0,
    };
  }

  onChangeImage = index => {
    if (this.props.images.length <= index) {
      index = 0;
    } else if (index < 0) {
      index = this.props.images.length - 1;
    }

    this.setState({ currIndex: index });
  };

  render() {
    // images.map(({ id }) => console.log(id));
    // images.map(({ id }) => console.log({ id }));
    // images.map(id => console.log({ id }));
    // images.map(id => console.log({ id }));
    const { currIndex } = this.state;
    const { images } = this.props;
    return (
      <>
        <div className="MainCarouselWapper">
          <div
            className="slideContainer"
            style={{
              width: `${images.length * 33}vw`,
              transform: `translateX(${currIndex * -33}vw)`,
            }}
          >
            {images.map(({ id, url }) => {
              return (
                <div
                  className="slideBox"
                  key={id}
                  style={{
                    width: '100%',
                    padding: '50px',
                  }}
                >
                  <div
                    className="img"
                    style={{
                      // width: '100em',
                      // height: '30em',
                      background: `url(${url}) no-repeat center`,
                      backgroundSize: 'cover',
                    }}
                  />
                </div>
              );
            })}
          </div>
          <ul className="dots">
            {images.map(({ id }) => {
              // console.log(id);
              return (
                <li key={id}>
                  <button
                    className={`${currIndex === id ? 'btnActive' : ''}`}
                    onClick={() => this.onChangeImage(id)}
                  >
                    {id}
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="slideBtn">
            {/* prevBtn */}
            <button
              className="prevBtn"
              onClick={() => {
                this.onChangeImage(currIndex - 1);
              }}
            >
              <span>
                <i className="fas fa-chevron-left" />
              </span>
            </button>
            {/* nextBtn */}
            <button
              className="nextBtn"
              onClick={() => {
                this.onChangeImage(currIndex + 1);
              }}
            >
              <span>
                <i className="fas fa-chevron-right" />
              </span>
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default Carousel;