$('.select').each(function() {
    const _this = $(this),
      selectOption = _this.find('option'),
      selectOptionLength = selectOption.length,
      selectedOption = selectOption.filter(':selected');
  
    _this.hide();
    _this.wrap('<div class="select"></div>');
    const selectTop = $('<div>', {
      class: 'new-select',
      text: _this.children('option:selected').text()
    });
    selectTop.append('<svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 8.00012L0.669873 0.500122L9.33013 0.500123L5 8.00012Z" fill="#492E16"/></svg>');
    selectTop.insertAfter(_this);
    const selectHead = _this.next('.new-select');
    $('<div>', {
      class: 'new-select__list'
    }).insertAfter(selectHead);
  
    const selectList = selectHead.next('.new-select__list');

    for (let i = 0; i < selectOptionLength; i++) {

      $('<div>', {
          class: 'new-select__item',
          html: $('<span>', {
            text: selectOption.eq(i).text()
          })
        })
        .attr('data-value', selectOption.eq(i).val())
        .appendTo(selectList);
    }
  
    const selectItem = selectList.find('.new-select__item');
    selectList.removeClass('active');
    selectHead.on('click', function() {
      if (!$(this).hasClass('on')) {
        $(this).addClass('on');
        selectList.addClass('active');
  
        selectItem.on('click', function() {
          let chooseItem = $(this).data('value');
  
          $('select').val(chooseItem).attr('selected', 'selected');
          selectHead.text($(this).find('span').text());
  
          selectList.removeClass('active');
          selectHead.removeClass('on');
        });
  
      } else {
        $(this).removeClass('on');
        selectList.removeClass('active');
      }
    });
  });



  $('.typeSelect').each(function() {
    const _this = $(this),
      selectOption = _this.find('option'),
      selectOptionLength = selectOption.length,
      selectedOption = selectOption.filter(':selected');
  
    _this.hide();
    _this.wrap('<div class="type-select__wrap"></div>');
    const selectTop = $('<div>', {
      class: 'type-select',
      text: _this.children('option:selected').text()
    })
    selectTop.append('<svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 8.00012L0.669873 0.500122L9.33013 0.500123L5 8.00012Z" fill="#492E16"/></svg>');
    selectTop.insertAfter(_this);
    const selectHead = _this.next('.type-select');
    $('<div>', {
      class: 'type-select__list'
    }).insertAfter(selectHead);
  
    const selectList = selectHead.next('.type-select__list');

    for (let i = 0; i < selectOptionLength; i++) {

      $('<div>', {
          class: 'type-select__item',
          html: $('<span>', {
            text: selectOption.eq(i).text()
          })
        })
        .attr('data-value', selectOption.eq(i).val())
        .appendTo(selectList);
    }
  
    const selectItem = selectList.find('.type-select__item');
    selectList.removeClass('active');
    selectHead.on('click', function() {
      if (!$(this).hasClass('on')) {
        $(this).addClass('on');
        selectList.addClass('active');
  
        selectItem.on('click', function() {
          let chooseItem = $(this).data('value');
  
          $('select').val(chooseItem).attr('selected', 'selected');
          selectHead.text($(this).find('span').text());
  
          selectList.removeClass('active');
          selectHead.removeClass('on');
        });
  
      } else {
        $(this).removeClass('on');
        selectList.removeClass('active');
      }
    });
  });