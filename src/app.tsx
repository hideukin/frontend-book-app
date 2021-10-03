import React from 'react'
import ReactDom from 'react-dom'
import $ from 'jquery'
import { Book, Review } from './app.d'
import createBookReview from './createBookReview'
import appendBook from './appendBook'

const root = document.getElementById('react-root');
ReactDom.render(<h1>React で描画する</h1>, root)

$(function () {
  $.ajax('http://localhost:1323/books')
    .done(function(books: Book[]) {
      books.forEach(book => $('#js-book-list').append($(appendBook(book))))

      $('.js-toggle-review').on('click', function(event) {
        var bookId = $(this).data('bookId')
        $('.js-review[data-book-id="' + bookId + '"]').toggle('fast')

        return false
      })

      $(document).on('click', '.js-like', function(event) {
        var likeCountElement = $(this).find('.js-like-count')
        likeCountElement.text(likeCountElement.text() + 1)

        return false
      })

      $(document).on('submit', '.js-form', function(event) {
        var bookId = $(this).data('bookId')
        $.ajax({
          url: 'http://localhost:1323/reviews',
          type: 'post',
          dataType: 'json',
          data: {
            comment: $(event.currentTarget).find('textarea').val()
          }
        }).done(function(review: Review) {
          $('.js-review[data-book-id="' + bookId + '"] > ul').append($(createBookReview(review)))
        })

        return false
      })
    })
})
