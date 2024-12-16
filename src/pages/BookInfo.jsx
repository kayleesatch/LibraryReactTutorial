import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Rating from '../components/ui/Rating'
import Price from '../components/ui/Price'
import { useParams } from 'react-router-dom'
import Book from '../components/ui/Book'

const BookInfo = ({ books, addToCart, cart = [] }) => {
    const { id } = useParams()
    const book = books.find((book) => +book.id === +id)

    const [isInCart, setIsInCart] = useState(false)

    //Effect hook to track the book in the cart
    useEffect(() => {
        //Checking if the current book is in the cart
        setIsInCart(cart.some((cartBook) => +cartBook.id === +id))
    }, [cart, id]) //Re-run when cart or id changes

    if (!book) {
        return <div>Book not found</div>
    }

    //Add book to cart
    function addBookToCart(book) {
        console.log("Adding book to cart:", book)
        addToCart(book)
    }

    return (
        <div id="books__body">
            <main id="books__main">
                <div className="books__container">
                    <div className="row">
                        <div className="book__selected--top">
                            <Link to="/books" className="book__link" >
                              <FontAwesomeIcon icon="arrow-left" />
                            </Link> 
                            <Link to="/books" className="book__link">
                            <h2 className="book__selected--title--top">Books</h2>
                            </Link>
                        </div>
                        <div className="book__selected">
                            <figure className="book__selected--figure">
                                <img 
                                src={book.url} 
                                alt={book.title} 
                                className="book__selected--img" 
                                />
                            </figure>
                            <div className="book__selected--description">
                                <h2 className="book__selected--title">
                                    {book.title}
                                </h2>
                                <Rating rating={book.rating} />
                                <div className="book__selected--price">
                                    <Price originalPrice={book.originalPrice} salePrice={book.salePrice} />
                                </div>
                                <div className="book__summary">
                                    <h3 className="book__summary--title">Summary</h3>
                                    <p className="book__summary--para">
                                        A walk-through of how to derive each solution, so that you can learn how to 
                                        get there yourself. Hints on how to solve each of the 189 questions, just 
                                        like what you would get in a real <b>interview.</b> Five proven strategies 
                                        to tackle algorithm questions, so that you can solve questions you haven't seen.
                                    </p>
                                </div>
                                {/*Conditionally render the button*/}
                                {isInCart ? (
                                    <Link to="/cart" className="book__link">
                                    <button className="btn">Checkout</button>
                                    </Link>
                                ) : (
                                <button className="btn" onClick={() => addBookToCart(book)}>
                                    Add to cart
                                </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="book__container">
                    <div className="row">
                        <div className="book__selected--top">
                            <div className="book__selected--title--top">
                                Recommended Books
                            </div>
                            <div className="books">
                                {books
                                .filter((book) => book.rating === 5 && +book.id !== +id)
                                .slice(0, 4)
                                .map((book) => (
                                    <Book book={book} key={book.id} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default BookInfo