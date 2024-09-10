function locomotiveAnimations(){
  gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
locomotiveAnimations()

function navBarAnimation() {
  gsap.to('#nav-part1 svg', {
    transform: 'translateY(-100%)',
    scrollTrigger:{
      trigger: '#page1',
      scroller: '#main',
      start: 'top 0',
      end: 'top -5%',
      scrub: true,
    }
  })
  gsap.to('#nav-part2 #links', {
    transform: 'translateY(-100%)',
    opacity: 0,
    scrollTrigger:{
      trigger: '#page1',
      scroller: '#main',
      start: 'top 0',
      end: 'top -5%',
      scrub: true,
    }
  })
}

navBarAnimation()

function cursor() {
    var videoCon = document.getElementById("video-container");
    var play = document.getElementById("play");

videoCon.addEventListener("mouseenter", function (dets) {
    gsap.to(play,{
        scale: 1,
        opacity: 1,
        duration: 1,
    })
})

videoCon.addEventListener("mouseleave", function (dets) {
    gsap.to(play,{
        scale: 0,
        opacity: 0,
        duration: 1
    })
})

videoCon.addEventListener("mousemove", function (dets) {
    var diffY = dets.clientY - videoCon.getBoundingClientRect().top; 
    var diffX = dets.clientX - videoCon.getBoundingClientRect().left;

    gsap.to(play,{
        left: diffX - 50,
        top: diffY- 50,
    })
})
}

cursor()

function loddingAnimation() {
    gsap.from("#page1 h1", {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        delay: .5,
    })

    gsap.from("#page1 #video-container", {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        delay: 1.5
    })
}

loddingAnimation()



function cursorAnimation() {
    document.addEventListener("mousemove", function (dets) {
      gsap.to("#cursor", {
        left: dets.x,
        top: dets.y,
      });
    });
    
    document.querySelectorAll(".child").forEach(function (elem) {
      elem.addEventListener("mouseenter", function () {
        gsap.to("#cursor", {
          transform: "translate(-50%,-50%) scale(1)",
        });
      });
      elem.addEventListener("mouseleave", function () {
        gsap.to("#cursor", {
          transform: "translate(-50%,-50%) scale(0)",
        });
      });
    });
  }
  cursorAnimation();