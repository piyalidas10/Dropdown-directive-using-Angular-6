import { Directive, HostListener, ElementRef, Renderer2, AfterViewInit, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements AfterViewInit, OnChanges {
  @Input() chooseOption;
  focusElementLi: any;
  currentFocusableIndex: any;
  selectedOptionText: any;

  constructor(private el: ElementRef, private ren: Renderer2) { }

  /* Click on select box options will open and close again click (Using Hostlistener) */
  // @HostListener('click') toggleOpen(event: Event) {
  //   const ulSelectList = this.el.nativeElement.querySelector('.select-box__list');
  //   const arrowIcon = this.el.nativeElement.querySelector('.select-box__icon');
  //   if (ulSelectList.classList.contains('open')) {
  //     ulSelectList.classList.remove('open');
  //     arrowIcon.classList.remove('open');
  //   } else {
  //     ulSelectList.classList.add('open');
  //     arrowIcon.classList.add('open');
  //   }
  // }

  ngAfterViewInit() {
    const selectBox = this.el.nativeElement;
    const ulSelectList = this.el.nativeElement.querySelector('.select-box__list');
    const arrowIcon = this.el.nativeElement.querySelector('.select-box__icon');
    this.selectedOptionText = this.el.nativeElement.querySelector('.select-box__input-text');
    this.setTabIndex(selectBox, this.selectedOptionText);


    /* Click on select box options will open and close against click (Using renderer2 listen method) */
    this.ren.listen(this.el.nativeElement, 'click', (event) => {
      if (ulSelectList.classList.contains('open')) {
        this.dropdownClose(ulSelectList, arrowIcon);
      } else {
        this.dropdownOpen(ulSelectList, arrowIcon);
      }
    });

    this.ren.listen(this.el.nativeElement, 'keydown', (event) => {
      console.log('event keydown => ', event);
      if (event.keyCode === 27 || event.key === 'Escape' || event.which === 27) { // ESCAPE key from keyboard
        this.dropdownClose(ulSelectList, arrowIcon);
        event.preventDefault();
      } else if (event.keyCode === 13 || event.key === 'Enter' || event.which === 13) { // ENTER key from keyboard
        if (ulSelectList.classList.contains('open')) {
          this.dropdownClose(ulSelectList, arrowIcon);
        } else {
          this.dropdownOpen(ulSelectList, arrowIcon);
          this.setFocusableElement(ulSelectList, this.selectedOptionText);
        }
        event.preventDefault();
      } else if (event.altKey && (event.keyCode === 40 || event.which === 40)) { // ALT + DOWN key from keyboard
        this.focusOptionLists(ulSelectList, this.selectedOptionText);
        event.preventDefault();
      } else if (event.altKey || (event.keyCode === 38 || event.which === 38)) { // ALT + UP key from keyboard
        this.focusOptionLists(ulSelectList, this.selectedOptionText);
        event.preventDefault();
      } else if (event.keyCode === 40 || event.which === 40) { // DOWN key from keyboard
        if (ulSelectList.classList.contains('open')) {
          const focusableLists = ulSelectList.children;
          if (this.currentFocusableIndex < focusableLists.length - 1) {
            this.nextFocusableElement(ulSelectList, this.selectedOptionText);
          }
        }
      } else {

      }
    });

    this.ren.listen(this.el.nativeElement, 'keyup', (event) => {
      console.log('event keyup => ', event);
      /* Close selectbox downdown using ESCAPE key from keyboard */
      if (event.keyCode === 27 || event.key === 'Escape' || event.which === 27) {
        this.dropdownClose(ulSelectList, arrowIcon);
        event.preventDefault();
      } else if (event.keyCode === 38 || event.which === 38) { // UP key from keyboard
        if (ulSelectList.classList.contains('open')) {
          const focusableLists = ulSelectList.children;
          if (this.currentFocusableIndex > 0) {
            this.previousFocusableElement(ulSelectList, this.selectedOptionText);
          }
        }
      } else {

      }
    });
  }

  ngOnChanges() {
    console.log('chooseOption => ', this.chooseOption);
    if (this.chooseOption !== undefined) {
      this.selectedOptionText.innerText = this.chooseOption.name;
    }
  }

  dropdownOpen(ulSelectList, arrowIcon) {
    ulSelectList.classList.add('open');
    arrowIcon.classList.add('open');
  }

  dropdownClose(ulSelectList, arrowIcon) {
    ulSelectList.classList.remove('open');
    arrowIcon.classList.remove('open');
  }

  changeSelectedText(val) {
    this.selectedOptionText.innerText = val;
  }

  setTabIndex(selectBox, selectedOptionText) {
    this.ren.setAttribute(selectBox, 'tabindex', '-1');
    this.ren.setAttribute(selectedOptionText, 'tabindex', '0');
  }

  focusOptionLists(ulSelectList, selectedOptionText) {
    console.log('focussableElements => ', ulSelectList.children);
    for (let i = 0; i < ulSelectList.children.length; i++) {
      this.ren.setAttribute(ulSelectList.children[i], 'tabindex', '-1');
    }
  }

  setFocusableElement(ulSelectList, selectedOptionText) {
    const focusableLists = ulSelectList.children;
    Array.from(focusableLists).forEach((element, index) => {
      if (selectedOptionText.innerText === element['innerText']) {
        focusableLists[index].focus();
        this.currentFocusableIndex = index;
      }
    });
  }

  nextFocusableElement(ulSelectList, selectedOptionText) {
    const focusableLists = ulSelectList.children;
    console.log('currentFocusableIndex => ', this.currentFocusableIndex);
    if (this.currentFocusableIndex < focusableLists.length - 1) {
      focusableLists[this.currentFocusableIndex + 1].focus();
      this.currentFocusableIndex ++;
      this.changeSelectedText(focusableLists[this.currentFocusableIndex].innerText);
    }
  }

  previousFocusableElement(ulSelectList, selectedOptionText) {
    const focusableLists = ulSelectList.children;
    console.log('currentFocusableIndex => ', this.currentFocusableIndex);
    if (this.currentFocusableIndex > 0) {
      focusableLists[this.currentFocusableIndex - 1].focus();
      this.currentFocusableIndex --;
      this.changeSelectedText(focusableLists[this.currentFocusableIndex].innerText);
    }
  }

}
