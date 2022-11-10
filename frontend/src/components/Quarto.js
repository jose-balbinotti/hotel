import React from 'react';
import { Carousel, Container } from 'react-bootstrap';

export const Quarto = () => {
    return (
        <Container>
            <h4>Quarto</h4>
            <div style={{display: 'block', width: 700, padding: 30}}>
                <Carousel variant="dark">
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="https://www.hplus.com.br/wp-content/uploads/2019/08/quarto-superior-solteiro-hotel-cullinan-hplus-em-brasilia-1.jpg"
                        alt="First slide"
                        />
                        <Carousel.Caption>
                        <h3>Quarto solteiro</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="https://www.hplus.com.br/wp-content/uploads/2019/08/quarto-cama-casal-hotel-vision-hplus-em-brasilia-5.jpg"
                        alt="Second slide"
                        />
                        <Carousel.Caption>
                        <h3>Quarto casal</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="https://media-cdn.tripadvisor.com/media/photo-s/11/f4/0e/2d/quarto-familia.jpg"
                        alt="Third slide"
                        />
                        <Carousel.Caption>
                        <h3>Quarto familia</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="https://www.wishhotels.com.br/neocms/images/hotels/0004/presidencial-1.jpg"
                        alt="Third slide"
                        />
                        <Carousel.Caption>
                        <h3>Quarto presidencial</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        </Container>
    )
}