const LIGHTBOX_FILTER_CLASSNAMES = {
  default: [
    '.gameWorld_bgImage',
    '.gameWorld_object',
    '.gameWorld_arrow',
    '.loginSquid',
    '.otherSquid',
    '.chatGroup',
  ],
};

// 聊天室移動畫面
const SCROLLAREA = {
  width: 120,
  height: 120,
  minSpeed: 1.2,
  maxSpeed: 6,
  currentSpeed: 0
};

let chatHover;

let needToScrollLeft = false;
let needToScrollRight = false;
let needToScrollBottom = false;
let needToScrollTop = false;


// 好友點擊切換
function chooseFriend() {
  document.querySelectorAll(".friendList_friend").forEach(e => {
    e.addEventListener("mouseover", e => {
      e.target.style = "cursor: pointer";
      e.stopPropagation();
    });
    e.addEventListener("click", e => {
      e.stopPropagation();
    });
  });
}

// 開關聊天室
function collapseChatGroup() {
  $(".friendList_open").click(function (e) {
    e.preventDefault();
    $(".chatGroup").toggle(function () {
      $(".chatGroup").addClass('slideInActive');
    }, function () {
      $(".chatGroup").removeClass('slideInActive');
    })
  });

  $(".closeBtn").click(function (e) {
    e.preventDefault();
    $(".chatGroup").toggle(function () {
      $(".chatGroup").addClass('slideInActive');
    }, function () {
      $(".chatGroup").removeClass('slideInActive');
    })
  });
}

// 開關通知
function collapseNotifications() {
  let actionBox = $(".notifications_actionBox");
  $(".button-notifications").click(function (e) {
    $(".notifications_container").toggleClass("collapse");
    if (actionBox.css("border-radius") == "0px 10px 10px 0px") {
      $(".notifications_actionBox").css("border-radius", "0");
    } else {
      $(".notifications_actionBox").css("border-radius", "0px 10px 10px 0px");
    }
  });
}

// 開關機器人
function collapseRobot() {
  // let actionBox = $(".notifications_actionBox");
  $(".button-robot").click(function () {
    $(".robot_container").toggleClass("collapse");
    // $('.robot-m').toggleClass("collapse");
  });
}

// 移除通知
function closeNotifications() {
  // $(".notifications_delete").click(function() {
  //   $(this.parentElement).remove();
  // });
  // $("body").on('click', '.notifications_delete', function(){

  // })
}

// 聊天室視窗移動
function moveScene(e) {
  // console.log(e.target);
  if (!e.target) {
    return;
  }
  let rootElement = e.target;
  while (true) {
    if (!rootElement) {
      return false;
    }
    if (
      rootElement === document.body ||
      rootElement.parentElement === document.body
    ) {
      break;
    }
    rootElement = rootElement.parentElement;
  }
  if (rootElement.classList.contains("disabledScrollOnHover")) {
    needToScrollLeft = false;
    needToScrollRight = false;
    needToScrollBottom = false;
    needToScrollTop = false;
    return false;
  }
  const x = e.clientX;
  const y = e.clientY;
  // console.log(x, y);

  const { innerWidth, innerHeight } = window;
  // console.log(innerWidth);
  if (x < SCROLLAREA.width) {
    const currentRatio = (SCROLLAREA.width - x) / SCROLLAREA.width; //比例
    const speed = SCROLLAREA.maxSpeed * currentRatio;
    SCROLLAREA.currentSpeed =
      speed < SCROLLAREA.minSpeed ? SCROLLAREA.minSpeed : speed;
    needToScrollLeft = true;
  } else {
    needToScrollLeft = false;
  }

  if (x > innerWidth - SCROLLAREA.width) {
    // const currentRatio = (innerWidth - x) / SCROLLAREA.width; // 120的幾分之幾 -> 比例
    const currentRatio = 1 - (innerWidth - x) / SCROLLAREA.width;
    const speed = SCROLLAREA.maxSpeed * currentRatio;
    SCROLLAREA.currentSpeed =
      speed < SCROLLAREA.minSpeed ? SCROLLAREA.minSpeed : speed;
    needToScrollRight = true;
  } else {
    needToScrollRight = false;
  }

  if (y > innerHeight - SCROLLAREA.height) {
    const currentRatio = 1 - (innerHeight - y) / SCROLLAREA.height;
    const speed = SCROLLAREA.maxSpeed * currentRatio;
    SCROLLAREA.currentSpeed =
      speed < SCROLLAREA.minSpeed ? SCROLLAREA.minSpeed : speed;
    needToScrollBottom = true;
  } else {
    needToScrollBottom = false;
  }

  let navHeight = document.querySelector(".common_header").offsetHeight;
  const lowerBound = SCROLLAREA.height + navHeight;
  if (y > navHeight && y < lowerBound) {
    const currentRatio = (lowerBound - y) / SCROLLAREA.height; //比例
    const speed = SCROLLAREA.maxSpeed * currentRatio;
    SCROLLAREA.currentSpeed =
      speed < SCROLLAREA.minSpeed ? SCROLLAREA.minSpeed : speed;
    needToScrollTop = true;
  } else {
    needToScrollTop = false;
  }
}

// 聊天室視窗移動計時器
function scrollLeftTimer() {
  setInterval(() => {
    if (needToScrollLeft) {
      document.scrollingElement.scrollLeft -= SCROLLAREA.currentSpeed;
    }
    if (needToScrollRight) {
      document.scrollingElement.scrollLeft += SCROLLAREA.currentSpeed;
    }
    if (needToScrollBottom) {
      document.scrollingElement.scrollTop += SCROLLAREA.currentSpeed;
    }
    if (needToScrollTop) {
      document.scrollingElement.scrollTop -= SCROLLAREA.currentSpeed;
    }
  }, 12);
}

// 登入視窗不捲動
function loginBoxNoScroll() {
  var elems = document.body.getElementsByClassName("loginBox");
  // console.log(elems);
  var len = elems.length;

  for (var i = 0; i < len; i++) {
    if (
      window.getComputedStyle(elems[i], null).getPropertyValue("position") ==
      "fixed"
    ) {
      // console.log(elems[i])
    }
  }
}

// 我的房間、活動巴士、排行榜開關燈箱
function switchPage() {
  $(".gameWorld_house").click(function (e) {
    e.preventDefault();
    $(".checkBox-room").toggleClass("collapse");
    filterBlur();
  });

  $(".gameWorld_bus").click(function (e) {
    e.preventDefault();
    $(".checkBox-event").toggleClass("collapse");
    filterBlur();
  });

  $(".gameWorld_cup").click(function (e) {
    e.preventDefault();
    $(".checkBox-leaderBoard").toggleClass("collapse");
    filterBlur();
  })

  $(".leaderBoard_closeArea").click(function (e) {
    e.preventDefault();
    $(".checkBox-leaderBoard").toggleClass("collapse");
    filterBlur();
  })

  $("#btnCancel-room").click(function (e) {
    e.preventDefault();
    $(".checkBox-room").toggleClass("collapse");
    filterBlur();
  });

  $("#btnCancel-event").click(function (e) {
    e.preventDefault();
    $(".checkBox-event").toggleClass("collapse");
    filterBlur();
  });
}

// 模糊濾鏡
function filterBlur(classNames = LIGHTBOX_FILTER_CLASSNAMES.default) {
  let { length } = classNames;
  for (i = 0; i < length; i++) {
    let className = classNames[i];
    let haveBlurFilter = $(className).css('filter');
    if (haveBlurFilter != 'none') {
      $(className).css('filter', '');
    } else {
      $(className).css('filter', 'blur(8px)');
    }
  }
}

// 聊天室按鈕動畫
function chatBtnMousemove() {
  $(".friendList_open").mouseenter(function () {
    if (isMobileDevice()) {
      return false;
    }
    $(".friendList_openBtn").css("transform", "translateY(0)");
    clearTimeout(chatHover);
  });
  $(".friendList_open").mouseleave(function () {
    chatHover = setTimeout(() => {
      $(".friendList_openBtn").css("transform", "translateY(100%)");
    }, 600);
  });
}

// 聊天室按鈕換圖
function chatGroupButtonHover() {
  $('.requestAccept').mouseover(function () {
    $(this).find('img').attr('src', 'imgs/homePage/icon/accept_hover.png');
  })
  $('.requestAccept').mouseout(function () {
    $(this).find('img').attr('src', 'imgs/homePage/icon/accept.png');
  })

  $('.requestRefuse').mouseover(function () {
    $(this).find('img').attr('src', 'imgs/homePage/icon/Refuse_hover.png');
  })
  $('.requestRefuse').mouseout(function () {
    $(this).find('img').attr('src', 'imgs/homePage/icon/Refuse.png');
  })

  $('.roomVisit').mouseover(function () {
    $(this).find('img').attr('src', 'imgs/homePage/icon/home_hover.png');
  })
  $('.roomVisit').mouseout(function () {
    $(this).find('img').attr('src', 'imgs/homePage/icon/home.png');
  })
}

// 判斷是否為行動裝置
function isMobileDevice() {
  try {
    document.createEvent("TouchEvent");
    return true;
  } catch {
    return false;
  }
}

function animation() {
  // smoke------------------------------------------------
  var smoke = document.getElementById("smoke");
  for (var i = 0; i < 20; i++) {
    //煙的數量
    var smokeDiv = document.createElement("div");
    smoke.appendChild(smokeDiv);
    smokeDiv.setAttribute("class", "particle");
  }
  // smoke------------------------------------------------
  // spray------------------------------------------------
  function spray() {
    var Particle,
      canvas,
      colors,
      createParticle,
      ctx,
      gravity,
      height,
      initParticles,
      particles,
      render,
      width;
    canvas = document.getElementById("spray");
    ctx = canvas.getContext("2d");
    width = canvas.width = 600;
    height = canvas.height = 600;
    particles = [];
    colors = ["#029DAF", "#E5D599", "#FFC219", "#F07C19", "#E32551"];
    gravity = 0.04;

    initParticles = function () {
      var i = 0;
      while (i < 200) {
        setTimeout(createParticle, 20 * i, i);
        i++;
      }
    };

    createParticle = function (i) {
      var color, opacity, p, size, vx, vy, x, y;
      x = width * 0.5;
      y = height * 0.5;
      vx = -2 + Math.random() * 4;
      vy = Math.random() * -3;
      size = 5 + Math.random() * 5;
      color = colors[i % colors.length];
      opacity = 0.5 + Math.random() * 0.5;
      p = new Particle(x, y, vx, vy, size, color, opacity);
      particles.push(p);
    };

    Particle = function (x, y, vx, vy, size, color, opacity) {
      function reset() {
        x = width * 0.5;
        y = height * 0.5;
        opacity = 0.5 + Math.random() * 0.5;
        vx = -2 + Math.random() * 4;
        vy = Math.random() * -3;
      }
      this.update = function () {
        if (opacity - 0.005 > 0) {
          opacity -= 0.005;
        } else {
          reset();
        }
        vy += gravity;
        x += vx;
        y += vy;
      };
      this.draw = function () {
        ctx.globalAlpha = opacity;
        ctx.fillStyle = color;
        ctx.fillRect(x, y, size, size);
      };
    };

    render = function () {
      ctx.clearRect(0, 0, width, height);
      var i = 0;
      while (i < particles.length) {
        particles[i].update();
        particles[i].draw();
        i++;
      }
      requestAnimationFrame(render);
    };

    initParticles();
    render();

    sprayTimer();

    function sprayTimer() {
      var time = 2500;
      a = setTimeout(sprayOpacity, time);
      function sprayOpacity() {
        canvas.style.opacity = 0;
        setTimeout(() => (canvas.style.opacity = 1), time);
        setTimeout(sprayOpacity, time * 2);
      }
    }
  }
  spray();
  // spray------------------------------------------------
}

function keyBoardNoScroll() {
  var ar = new Array(33, 34, 35, 36, 37, 38, 39, 40);

  $(document).keydown(function (e) {
    var key = e.which;
    //console.log(key);
    //if(key==35 || key == 36 || key == 37 || key == 39)
    if ($.inArray(key, ar) > -1) {
      e.preventDefault();
      return false;
    }
    return true;
  });
}

// 透明度橫桿
function opacitySlider() {
  $('#bgopacity').on('input', function (value) {
    $('.chatGroup').css({
      opacity: $(this).val() * '.01'
    });
  });
}

$(document).ready(function(){
  chooseFriend();
  collapseChatGroup();
  collapseNotifications();
  closeNotifications();
  collapseRobot();
  scrollLeftTimer();
  loginBoxNoScroll();
  switchPage();
  chatBtnMousemove();
  animation();
  chatGroupButtonHover();
  opacitySlider();
})

window.addEventListener("mousemove", function (e) {
  // moveScene(e);
});
