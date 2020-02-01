$(function() {
  $('.main-slider__slider-big').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: '<div class="main-slider__button main-slider__button_position main-slider__button_left wow bounceInLeft"><i class="fa fa-angle-left" aria-hidden="true"></i></div>',
    nextArrow: '<div class="main-slider__button main-slider__button_position main-slider__button_right wow bounceInRight"><i class="fa fa-angle-right" aria-hidden="true"></i></div>',
    fade: true,
    dots: false,
    infinite: true,
    centerPadding: 0,
    centerMode: true,
    autoplay: true,
    asNavFor: '.main-slider__slider-small'
  });
  $('.main-slider__slider-small').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: '.main-slider__slider-big',
    focusOnSelect: true,
    infinite: true,
    arrows: false,
    centerPadding: 0,
    centerMode: true,
    autoplay: true,
  });
  $('.slider-items__slider').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: '<div class="main-slider__button main-slider__button_left wow bounceInLeft"><i class="fa fa-angle-left" aria-hidden="true"></i></div>',
    nextArrow: '<div class="main-slider__button main-slider__button_right wow bounceInRight"><i class="fa fa-angle-right" aria-hidden="true"></i></div>',
    dots: false,
    infinite: true,
    centerPadding: 0,
    centerMode: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        }
      },
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        }
      },
      {
        breakpoint: 601,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          centerMode: false,
        }
      }
    ]
  });
  let sumPrice = []; // создаём массив товаров
  $('body').on('click', '.fa-star', function () {
    let star = $(this) // звезда
    let shoppingSum = $('.shopping-cart__sum-items'); // сумма товаров
    let totalItems = $('.shopping-cart__total-items'); // количество товаров
    let pushPrice = star.siblings('.item-card-small__item-about').find('.item-card-small__item-price').html(); // цена товара
    let itemTitle = star.siblings('.item-card-small__item-title').html();
    if (!star.hasClass('active')) { // проверяем, есть ли у звёзд класс active
      star.addClass('active');
      sumPrice.push(pushPrice);
      $('.pop-up__item-add-title').html('Товар' + ' "' + itemTitle + '" ' + 'добавлен в корзину');
      $('.price').html(pushPrice);
      $('.total-price').html(arraySum(sumPrice));
      $('.pop-up_delete').fadeOut(800);
      $('.pop-up_add').fadeIn(800);
      setTimeout(() => {
        $('.pop-up_add').fadeOut(800);
      }, 5000);
    } else {
      star.removeClass('active');
      sumPrice.pop(pushPrice);
      $('.pop-up__item-delete-title').html('Товар' + ' "' + itemTitle + '" ' + 'удалён из корзины');
      $('.current-price').html(arraySum(sumPrice));
      $('.pop-up_add').fadeOut(800);
      $('.pop-up_delete').fadeIn(800);
      setTimeout(() => {
        $('.pop-up_delete').fadeOut(800);
      }, 5000);
    }
    function arraySum(arr) {
      let sum = 0;
      if (arr.length) {
        sum = arr.reduce((a, b) => {
          return (parseFloat(a) || 0) + (parseFloat(b) || 0);
        });
      } else {
        sum = 0;
      }
      return sum;
    }
    shoppingSum.html(arraySum(sumPrice)); // вносим общую сумму товаров в корзине
    totalItems.html(sumPrice.length); // вносим общее количество товаров в корзине
  })
  new WOW().init();

  $('.faq-panel__title-1').hover(mouseEnterRotate, mouseLeaveRotate);

  function mouseEnterRotate() {
    $(this).siblings().css('transform', 'rotate(360deg)');
  };

  function mouseLeaveRotate() {
    $(this).siblings().css('transform', 'rotate(0deg)');
  };

  $('.faq-panel__title-2').hover(mouseEnterRotate, mouseLeaveRotate);

  $('.faq-panel__title-3').hover(mouseEnterRotate, mouseLeaveRotate);

  $('.facebook-link').hover(opacityZero, opacityOne);
  $('.twitter-link').hover(opacityZero, opacityOne);
  $('.youtube-link').hover(opacityZero, opacityOne);
  $('.instagram-link').hover(opacityZero, opacityOne);


  function opacityZero() {
    $(this).parent().siblings().find('.fa').addClass('rotate');
    setTimeout(() => {
      $(this).parent().siblings().find('.fa').css('opacity', '0')
    }, 200);
  }
  function opacityOne() {
    $(this).parent().siblings().find('.fa').css('opacity', '1');
    $(this).parent().siblings().find('.fa').removeClass('rotate');
  }

  $('.footer__input-mail').on('keyup', function () {
    let inputMail = $(this).val();
    if (inputMail != '') {
      $('.footer__input-button').css('color', 'lightgreen');
    } else $('.footer__input-button').css('color', '#cccccc'); 
  })

  $('#search').on('keyup', function () {
    let inputSearch = $(this).val();
    if (inputSearch != '') {
      $('.header__input-button').css('color', 'lightgreen');
    } else $('.header__input-button').css('color', '#cccccc');
  });

  $('.register-form__log').on('input', function () {
    let currentInputValue = $(this).val();
    if (currentInputValue != '') {
      $(this).siblings().css('color', '#000')
    } else $(this).siblings().css('color', '#cccccc')
  })

  $('.pop-up__close-button').on('click', function (e) {
    e.preventDefault();
    $('.pop-up').fadeOut();
  });

  $('#search').on('input', function () {
    let val = $('#search').val().replace(/\s+/g,'').trim().toLowerCase();
    let searchItems = $('.search__item');
    if (val != '') {
      Array.prototype.forEach.call(searchItems, function (elem) {
        if ($(elem).html().replace(/\s+/g,'').trim().toLowerCase().search(val) == -1) {
          $(elem).css('display', 'none');
        }
        else {
          $('#search').css({
            'border-bottom-left-radius': 0,
            'border-bottom-right-radius': 0
          });
          $('.search__list').css('display', 'block');
          $(elem).css('display', 'flex');
        }
      })
    } else {
      Array.prototype.forEach.call(searchItems, function (elem) {
        $('#search').css({
          'border-bottom-left-radius': '5px',
          'border-bottom-right-radius': '5px'
        });
        $('.search__list').css('display', 'none');
        $(elem).css('display', 'none');
      })
    }
  })


  $('.calc__input-block').on('input', function () {
    let rangeMin = $(this).parent().siblings().children().attr('min');
    let rangeMax = $(this).parent().siblings().children().attr('max');
    let getValue = $(this).val();
    if (getValue != '') {
      if (getValue < rangeMin) {
        $(this).parent().siblings().children().val(rangeMin);
      } else if (getValue > rangeMax) {
        $(this).parent().siblings().children().val(rangeMax);
      }
      $(this).parent().siblings().children().val(getValue);
    } else $(this).parent().siblings().children().val(rangeMin);
  });


  $('.calc__range').on('input', function () {
    let rangeValue = $(this).val();
    $(this).parent().siblings().children().val(rangeValue);
  });

  
  $('.button__get-result').on('click', function (e) {
    e.preventDefault();
    let getSum = parseInt($('#sum').val());
    let getTotalTime = parseInt($('#time').val());
    let getFirstDeposite = parseInt($('#deposite').val());
    let difference = parseInt((getSum - getFirstDeposite));
    let monthlyPayment = Math.round(((difference * 1.1) / getTotalTime));
    let overPayment = parseInt(difference * 0.1);
    let totalPayment = parseInt(difference + overPayment);
    let getTotalSum = parseInt(getSum + overPayment);
    let line = parseInt(((getSum / getTotalSum) * 100));
    if (getFirstDeposite < getSum) {
      $('.monthly-payment').html(monthlyPayment);
      $('.overpayment').html(overPayment);
      $('.total-payment').html(totalPayment);
      $('.result__line_green').animate(
        {
          'width': `${line}` + `%`
        }, 800
      )
    }
  })

  $('.popular').on('click', function (e) {
    e.preventDefault();
    let itemPopular = $('.sort-news__item'); // все элементы списка
    let itemsArray = []; // создаём массив
    let itemList = $(itemPopular[0]).parent(); // список
    for (let i = 0; i < itemPopular.length; i++) {
      itemsArray.push(itemPopular[i]);
      itemList.children(itemPopular[i]).remove(); // добавляем все элементы в массив, затем удаляем их из списка
    }
    itemsArray.sort(function (nodeA, nodeB) { // сортировка массива
      let textA = $(nodeA).find('.sort-news__total-views').text(); 
      let textB = $(nodeB).find('.sort-news__total-views').text();
      let numberA = parseInt(textA);
      let numberB = parseInt(textB);
      if (numberA > numberB) return -1;
      if (numberA < numberB) return 1;
      return 0;
    })
      .forEach(function (elem) {
        $(itemList).append(elem)
      });
    $('.sort-news__item-descr .sort-news__total-views').css({
      'color' : '#000',
      'font-weight' : 'bold'
    });
    $('.sort-news__item-descr .fa-eye').css({
      'color': '#000',
      'font-weight': 'bold'
    })
    $('.sort-news__item-descr .sort-news__total-comments').css({
      'color': '',
      'font-weight': ''
    });
    $('.sort-news__item-descr .fa-comment-o').css({
      'color': '',
      'font-weight': ''
    });
    $('.sort-news__item-descr .sort-news__item-date').css({
      'color': '',
      'font-weight': ''
    });
    $('.sort-news__item-descr .fa-clock-o').css({
      'color': '',
      'font-weight': ''
    });
  })

  $('.discussed').on('click', function (e) {
    e.preventDefault();
    let itemPopular = $('.sort-news__item');
    let itemsArray = [];
    let itemList = $(itemPopular[0]).parent();
    for (let i = 0; i < itemPopular.length; i++) {
      itemsArray.push(itemPopular[i]);
      itemList.children(itemPopular[i]).remove();
    }
    itemsArray.sort(function (nodeA, nodeB) {
      let textA = $(nodeA).find('.sort-news__total-comments').text();
      let textB = $(nodeB).find('.sort-news__total-comments').text();
      let numberA = parseInt(textA);
      let numberB = parseInt(textB);
      if (numberA > numberB) return -1;
      if (numberA < numberB) return 1;
      return 0;
    })
      .forEach(function (elem) {
        $(itemList).append(elem)
      });
    $('.sort-news__item-descr .sort-news__total-comments').css({
      'color': '#000',
      'font-weight': 'bold'
    });
    $('.sort-news__item-descr .fa-comment-o').css({
      'color': '#000',
      'font-weight': 'bold'
    })
    $('.sort-news__item-descr .sort-news__total-views').css({
      'color': '',
      'font-weight': ''
    });
    $('.sort-news__item-descr .fa-eye').css({
      'color': '',
      'font-weight': ''
    })
    $('.sort-news__item-descr .sort-news__item-date').css({
      'color': '',
      'font-weight': ''
    });
    $('.sort-news__item-descr .fa-clock-o').css({
      'color': '',
      'font-weight': ''
    });
  })

  $('.latest').on('click', function (e) {
    e.preventDefault();
    let itemPopular = $('.sort-news__item');
    let itemsArray = [];
    let itemList = $(itemPopular[0]).parent();
    for (let i = 0; i < itemPopular.length; i++) {
      itemsArray.push(itemPopular[i]);
      itemList.children(itemPopular[i]).remove();
    }
    itemsArray.sort(function (nodeA, nodeB) {
      let dateAttrA = $(nodeA).find('.sort-news__item-date').attr('data-date');
      let dateAttrB = $(nodeB).find('.sort-news__item-date').attr('data-date');
      let dateA = new Date(dateAttrA);
      let dateB = new Date(dateAttrB);
      if (dateA > dateB) return -1;
      if (dateA < dateB) return 1;
      return 0;
    })
      .forEach(function (elem) {
        $(itemList).append(elem)
      });
    $('.sort-news__item-descr .sort-news__item-date').css({
      'color': '#000',
      'font-weight': 'bold'
    });
    $('.sort-news__item-descr .fa-clock-o').css({
      'color': '#000',
      'font-weight': 'bold'
    });
    $('.sort-news__item-descr .sort-news__total-comments').css({
      'color': '',
      'font-weight': ''
    });
    $('.sort-news__item-descr .fa-comment-o').css({
      'color': '',
      'font-weight': ''
    })
    $('.sort-news__item-descr .sort-news__total-views').css({
      'color': '',
      'font-weight': ''
    });
    $('.sort-news__item-descr .fa-eye').css({
      'color': '',
      'font-weight': ''
    })
  })

  let countNews = $('.news-page_item');
  let count = countNews.length; //всего записей
  let cnt = 4; //сколько отображаем сначала
  let cntPage = Math.ceil(count / cnt); 

  //выводим список страниц
  let newsPaginator = $(".news__paginator");
  let page = "";
  for (let i = 0; i < cntPage; i++) {
    page += '<div class="slider-items__btn button news-block_btn"><a href="#" data-page=' + i * cnt + ' id=\"page' + (i + 1) + '\"  class="button__link news-block__read-link news-pagination__btn-page">' + (i + 1) + '</a></div>'
  }
  $(newsPaginator).html(page);

  //выводим первые записи {cnt}
  let divNumNews = $(".news__item");
  for (let i = 0; i < divNumNews.length; i++) {
    if (i < cnt) {
      divNumNews[i].style.display = "block";
    }
  }

  // переключаем страницы
  let mainPageNews = $("#page1");
  mainPageNews.addClass("paginator_active");

  $('.news__paginator').on('click', function (event) {
    event.preventDefault();
    let e = event || window.event;
    let target = e.target;
    let id = target.id;

    if ($(target).get(0).tagName.toLowerCase() != "a") return;
    let data_page = $(target).attr('data-page');
    $(mainPageNews).removeClass("paginator_active");
    mainPageNews = $('#' + id);
    $(mainPageNews).addClass("paginator_active");

    let j = 0;
    for (let i = 0; i < divNumNews.length; i++) {
      let data_num = $(divNumNews[i]).attr('data-num');
      if (data_num <= data_page || data_num >= data_page)
        divNumNews[i].style.display = "none";
    }
    for (let i = data_page; i < divNumNews.length; i++) {
      if (j >= cnt) break;
      divNumNews[i].style.display = "block";
      j++;
    }
  })

  $('.filter__title-list').on('click', function (e) {
    e.preventDefault();
    $('.item-settings__filter-list').toggleClass('visible-filter');
    $('.fa-angle-down', this).toggleClass('rotate180deg');
  })

  $('body').on('click', function (e) {
    let target = e.target;
    if ($(target).get(0).className != 'filter__title-list') {
      $('.item-settings__filter-list').removeClass('visible-filter');
      $('.fa-angle-down').removeClass('rotate180deg');
    }
  })

  function pagination() {
    let countItems = $('.item-page_width');
    let countItemsTotal = countItems.length; //всего записей
    let cntItems = 9; //сколько отображаем сначала
    let cntPageItems = Math.ceil(countItemsTotal / cntItems);

    //выводим список страниц
    let itemsPaginator = $(".item-page__paginator");
    let pageItems = "";
    for (let i = 0; i < cntPageItems; i++) {
      pageItems += '<li class="slider-items__btn button news-block_btn item-page__pagination-btn"><a href="#" data-pageItems=' + i * cntItems + ' id=\"pageItems' + (i + 1) + '\"  class="button__link news-block__read-link news-pagination__btn-page">' + (i + 1) + '</a></li>'
    }
    $(itemsPaginator).html(pageItems);
    $(itemsPaginator).prepend('<li class="slider-items__btn button news-block_btn item-page__pagination-btn"><a href="#" data-pageItems="0" class="item-pagination__btn button__link item-block__read-link prev-btn">Предыдущая</a></li>');
    $(itemsPaginator).append('<li class="slider-items__btn button news-block_btn item-page__pagination-btn"><a href="#" data-pageItems="9" class="item-pagination__btn button__link item-block__read-link next-btn">Следующая</a></li>');
    
    //выводим первые записи {cnt}
    let divNumItems = $(".item-page_width");
    for (let i = 0; i < divNumItems.length; i++) {
      if (i < cntItems) {
        $(divNumItems[i]).attr('style', "display:flex !important");
      }
    }

    // переключаем страницы
    let mainPageItems = $("#pageItems1");
    mainPageItems.addClass("paginator_active");
    $('.item-page__paginator').on('click', function (event) {
      event.preventDefault();
      let e = event || window.event;
      let target = e.target;
      let id = target.id;
      let idNumber = parseInt(id.match(/\d+/));
      if ($(target).get(0).tagName.toLowerCase() != "a") return;
      let data_page = $(target).attr('data-pageItems');
      $(mainPageItems).removeClass("paginator_active");
      mainPageItems = $('#pageItems' + idNumber);
      $(mainPageItems).addClass("paginator_active");
      if ($(target).get(0).className.toLowerCase() == "item-pagination__btn button__link item-block__read-link next-btn") {
        $(mainPageItems).removeClass("paginator_active");
        mainPageItems = $('#pageItems2');
        $(mainPageItems).addClass("paginator_active");
        let j = 0;
        for (let i = 0; i < divNumItems.length; i++) {
          let data_num = $(divNumItems[i]).attr('data-num');
          if (data_num <= data_page || data_num >= data_page)
            $(divNumItems[i]).attr('style', "display:none !important");
        }
        for (let i = data_page; i < divNumItems.length; i++) {
          if (j >= cntItems) break;
          $(divNumItems[i]).attr('style', "display:flex !important");
          j++;
        }
      };
      if ($(target).get(0).className.toLowerCase() == "item-pagination__btn button__link item-block__read-link prev-btn") {
        $(mainPageItems).removeClass("paginator_active");
        mainPageItems = $('#pageItems1');
        $(mainPageItems).addClass("paginator_active");
        let j = 0;
        for (let i = 0; i < divNumItems.length; i++) {
          let data_num = $(divNumItems[i]).attr('data-num');
          if (data_num <= data_page || data_num >= data_page)
            $(divNumItems[i]).attr('style', "display:none !important");
        }
        for (let i = data_page; i < divNumItems.length; i++) {
          if (j >= cntItems) break;
          $(divNumItems[i]).attr('style', "display:flex !important");
          j++;
        }
      };
      let j = 0;
      for (let i = 0; i < divNumItems.length; i++) {
        let data_num = $(divNumItems[i]).attr('data-num');
        if (data_num <= data_page || data_num >= data_page)
          $(divNumItems[i]).attr('style', "display:none !important");
      }
      for (let i = data_page; i < divNumItems.length; i++) {
        if (j >= cntItems) break;
        $(divNumItems[i]).attr('style', "display:flex !important");
        j++;
      }
    })
    mainPageItems.click();
  }
  
  pagination();

  $('#filter_greater').on('click', function () {
    $('.filter__title-list').html('по возрастанию цены <i class="fa fa-angle-down" aria-hidden="true"></i>');
    let itemGreater = $('.slider-item-width');
    let itemsArray = [];
    let itemList = $(itemGreater[0]).parent();
    for (let i = 0; i < itemGreater.length; i++) {
      itemsArray.push(itemGreater[i]);
      itemList.children(itemGreater[i]).remove();
    }
    itemsArray.sort(function (nodeA, nodeB) {
      let textA = $(nodeA).find('.item-card-small__item-price').text();
      let textB = $(nodeB).find('.item-card-small__item-price').text();
      let numberA = parseInt(textA);
      let numberB = parseInt(textB);
      if (numberA < numberB) return -1;
      if (numberA > numberB) return 1;
      return 0;
    })
      .forEach(function (elem) {
        $(itemList).append(elem)
      });
    pagination();
  })

  $('#filter_lesser').on('click', function () {
    $('.filter__title-list').html('по убыванию цены <i class="fa fa-angle-down" aria-hidden="true"></i>');
    let itemGreater = $('.slider-item-width');
    let itemsArray = [];
    let itemList = $(itemGreater[0]).parent();
    for (let i = 0; i < itemGreater.length; i++) {
      itemsArray.push(itemGreater[i]);
      itemList.children(itemGreater[i]).remove();
    }
    itemsArray.sort(function (nodeA, nodeB) {
      let textA = $(nodeA).find('.item-card-small__item-price').text();
      let textB = $(nodeB).find('.item-card-small__item-price').text();
      let numberA = parseInt(textA);
      let numberB = parseInt(textB);
      if (numberA > numberB) return -1;
      if (numberA < numberB) return 1;
      return 0;
    })
      .forEach(function (elem) {
        $(itemList).append(elem)
      });
    pagination();
  })

  $('#filter_rating').on('click', function () {
    $('.filter__title-list').html('по рейтингу <i class="fa fa-angle-down" aria-hidden="true"></i>');
    pagination();
  })

  $('#filter_popular').on('click', function (e) {
    e.preventDefault();
    let itemGreater = $('.slider-item-width');
    let itemsArray = [];
    let itemList = $(itemGreater[0]).parent();
    for (let i = 0; i < itemGreater.length; i++) {
      itemsArray.push(itemGreater[i]);
      itemList.children(itemGreater[i]).remove();
    }
    itemsArray.sort(function (nodeA, nodeB) {
      let textA = $(nodeA).find('.item-page__total-rates').text();
      let textB = $(nodeB).find('.item-page__total-rates').text();
      let numberA = parseInt(textA);
      let numberB = parseInt(textB);
      if (numberA > numberB) return -1;
      if (numberA < numberB) return 1;
      return 0;
    })
      .forEach(function (elem) {
        $(itemList).append(elem)
      });
    pagination();
  })

  $('.aside-filter__range-price_lower').on('input', function () {
    let rangePriceZero = $('.aside-filter__range-price_lower').val();
    let rangePriceFirst = $('.aside-filter__range-price_higher').val();
    if (+rangePriceZero > (+rangePriceFirst - 500)) {
      $('.aside-filter__range-price_higher').val(+rangePriceZero + 700);
    } 
    $('.aside-filter__input-price_higher').val(+rangePriceFirst);
  });

  $('.aside-filter__range-price_higher').on('input', function () {
    let rangePriceZero = $('.aside-filter__range-price_lower').val();
    let rangePriceFirst = $('.aside-filter__range-price_higher').val();
    if (+rangePriceFirst < (+rangePriceZero + 500)) {
      $('.aside-filter__range-price_lower').val(+rangePriceFirst - 700)
    }
    $('.aside-filter__input-price_lower').val(+rangePriceZero);
  });

  $('.aside-filter_title').on('click', function (e) {
    e.preventDefault();
    $(this).siblings().toggleClass('drop-list');
    $('.fa-angle-down', this).toggleClass('rotate-arrow');
    $('span', this).toggleClass('bold');
  })

  $('.aside-filter__input-price_lower').on('input', function () {
    let rangeMin = $(this).parent().siblings().find('.aside-filter__range-price_lower').attr('min');
    let rangeMax = $(this).parent().siblings().find('.aside-filter__range-price_lower').attr('max');
    let getValue = $(this).val();
    if (getValue != '') {
      if (getValue < rangeMin) {
        $(this).parent().siblings().find('.aside-filter__range-price_lower').val(rangeMin);
      } else if (getValue > rangeMax) {
        $(this).parent().siblings().find('.aside-filter__range-price_lower').val(rangeMax);
      }
      $(this).parent().siblings().find('.aside-filter__range-price_lower').val(getValue);
    } else $(this).parent().siblings().find('.aside-filter__range-price_lower').val(rangeMin);
  });


  $('.aside-filter__range-price_lower').on('input', function () {
    let rangeValue = $(this).val();
    $(this).parent().siblings().find('.aside-filter__input-price_lower').val(rangeValue);
  });


  $('.aside-filter__input-price_higher').on('input', function () {
    let rangeMin = $(this).parent().siblings().find('.aside-filter__range-price_higher').attr('min');
    let rangeMax = $(this).parent().siblings().find('.aside-filter__range-price_higher').attr('max');
    let getValue = $(this).val();
    if (getValue != '') {
      if (getValue < rangeMin) {
        $(this).parent().siblings().find('.aside-filter__range-price_higher').val(rangeMin);
      } else if (getValue > rangeMax) {
        $(this).parent().siblings().find('.aside-filter__range-price_higher').val(rangeMax);
      }
      $(this).parent().siblings().find('.aside-filter__range-price_higher').val(getValue);
    } else $(this).parent().siblings().find('.aside-filter__range-price_higher').val(rangeMin);
  });


  $('.aside-filter__range-price_higher').on('input', function () {
    let rangeValue = $(this).val();
    $(this).parent().siblings().find('.aside-filter__input-price_higher').val(rangeValue);
  });

  $('.aside-filter__button_reset').on('click', function(e) {
    e.preventDefault();
    $('input:checked').prop('checked', false);
  })

  $('.filter-buttons__button-sort-settings').on('click', function (e) {
    e.preventDefault();
    $('.item-page__item-settings_hide').toggleClass('show');
  })

  $('.filter-buttons__button-filter-settings').on('click', function (e) {
    e.preventDefault();
    $('.aside-filter__wrapper_hide').toggleClass('show-filter');
  })

  $('.aside-filter__button_apply').on('click', function (e) {
    e.preventDefault();
    $('.aside-filter__wrapper').removeClass('show-filter')
  })

  $('.item-response__rate .fa').on('click', function () {
    return false;
  })
})