export class Slide {
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);
    this.dist = {finalPosition: 0, startX: 0,movement: 0}
    this.activeClass = 'active'
  }

  transition(active) {
    this.slide.style.transition = active ? 'transform .3s' : '';
  }

  moveSlide(distX) {
    this.dist.movePosition = distX
    this.slide.style.transform = `translate3d(${distX}px ,0 ,0)`
  }

  updatePosition(clientX) {
    this.dist.movement = (this.dist.startX - clientX) * 1.6;
    return this.dist.finalPosition - this.dist.movement;
  }

  onStart(event) {
    let moveType;
    if (event.type === 'mousedown') {
      event.preventDefault();
      this.dist.startX = event.clientX;
      moveType = 'mousemove';
    } else {
      this.dist.startX = event.changedTouches[0].clientX;
      moveType = 'touchmove';
    }
    this.wrapper.addEventListener(moveType,this.onMove)
    this.transition(false)
  }

  onEnd(event) {
    const moveType = (event.type === 'mouseup') ? 'mousemove' : 'touchmove';
    this.wrapper.removeEventListener(moveType, this.onMove)
    this.dist.finalPosition = this.dist.movePosition;
    this.transition(true)
    this.changeSlideOnEnd();
  }

  changeSlideOnEnd() {
    if (this.dist.movement > 120) {
      this.activeNextSlide();
    } else if (this.dist.movement < -120) {
      this.activePrevSlide();
    } else {
      this.changeSlide(this.index.active);
    }
  }//aaaaaaaaaaaaaaaaaaaaa

  onMove(event) {
    const pointerPosition = (event.type === 'mousemove') ? event.clientX : event.changedTouches[0].clientX
    const finalPostion = this.updatePosition(pointerPosition);
    this.moveSlide(finalPostion);
  }

  addSlideEvents() {
    this.wrapper.addEventListener('mousedown',this.onStart)
    this.wrapper.addEventListener('touchstart',this.onStart)
    this.wrapper.addEventListener('mouseup',this.onEnd)
    this.wrapper.addEventListener('touchend',this.onEnd)
  }

  //slides configs

  slidePosition(slide) {
    const margin = (this.wrapper.offsetWidth - slide.offsetWidth) / 2;
    return -(slide.offsetLeft - margin)
  }

  slidesConfigs() {
    this.slideArray = [...this.slide.children].map((element) => {
      const position = this.slidePosition(element);
      return {position, element};
    })
  }

  slideIndexNav(index) {
    const last = this.slideArray.length - 1;
    this.index = {
      prev: index ? index - 1 : undefined,
      active: index,
      next: index === last ? undefined : index + 1,
    }
  }

  changeSlide(index) {
    const activeSlide = this.slideArray[index]
    this.moveSlide(this.slideArray[index].position)
    this.slideIndexNav(index);
    this.dist.finalPosition = activeSlide.position;
    this.changeActiveClass()
  }

  changeActiveClass() {
    this.slideArray.forEach(item => item.element.classList.remove(this.activeClass))
    this.slideArray[this.index.active].element.classList.add(this.activeClass)
  }

  activeNextSlide() {
    if (this.index.next !== undefined) {
      this.changeSlide(this.index.next);
    } else {
      this.changeSlide(0);
    }
  }
  
  activePrevSlide() {
    if (this.index.prev !== undefined) {
      this.changeSlide(this.index.prev);
    } else {
      this.changeSlide(this.slideArray.length - 1);
    }
  }

  onResize() {
    setTimeout(() => {
      this.slidesConfigs();
      this.changeSlide(this.index.active);
    },1000)
  }

  addResizeEvent() {
    window.addEventListener('resize', this.onResize);
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.onResize = this.onResize.bind(this);
    this.activePrevSlide = this.activePrevSlide.bind(this);
    this.activeNextSlide = this.activeNextSlide.bind(this);

    this.addSlideEvents();
  }

  init(){
    this.bindEvents();
    this.transition(true)
    this.addSlideEvents();
    this.slidesConfigs();
    this.addResizeEvent();
    this.changeSlide(2)
    return this;
  }
}

export class SlideNav extends Slide {
  addArrow(prev,next) {
    this.prevElement = document.querySelector(prev)
    this.nextElement = document.querySelector(next)
    this.addArrowEvent();
  }

  addArrowEvent() {
    this.prevElement.addEventListener('click', this.activePrevSlide)
    this.nextElement.addEventListener('click', this.activeNextSlide)
  }
}