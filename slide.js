export default class Slide {
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);
    this.dist = {finalPosition: 0, startX: 0,movement: 0}
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
  }

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

  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.addSlideEvents();
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
  }

  activeNextSlide() {
    if (this.index.next !== undefined) {
      this.changeSlide(this.index.next);
    } else {
      this.changeSlide(0); // Volta ao primeiro slide quando atinge o último
    }
  }
  
  activePrevSlide() {
    if (this.index.prev !== undefined) {
      this.changeSlide(this.index.prev);
    } else {
      this.changeSlide(this.slideArray.length - 1); // Vai para o último slide ao tentar voltar antes do primeiro
    }
  }


  init(){
    this.bindEvents();
    this.addSlideEvents();
    this.slidesConfigs();
    this.changeSlide(3)

    this.transition(true)
    return this;
  }
}