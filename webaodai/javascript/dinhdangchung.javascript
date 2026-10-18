const menuButton = document.querySelector(".menu-toggle");
const navbar = document.querySelector(".navbar");

if (menuButton && navbar) {
    menuButton.addEventListener("click", function () {
        navbar.classList.toggle("show");
    });
}
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.querySelector("#name").value.trim();
        const message = document.querySelector(".form-message");

        if (name === "") {
            message.textContent = "Vui lòng nhập họ và tên!";
            return;
        }

        message.textContent =
            "Cảm ơn " + name + "! Bạn đã hoàn thành biểu mẫu.";

        contactForm.reset();
    });
}
const cards = document.querySelectorAll(".product-card, .intro-card");
if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    cards.forEach(function (card) {
        observer.observe(card);
    });
}
(function () {
  "use strict";
  var nutMenu = document.querySelector(".menu-toggle");
  var menu = document.querySelector(".navbar");
  if (nutMenu && menu) {
    nutMenu.addEventListener("click", function () {
      menu.classList.toggle("show");
    });
  }
  var cacMuc = document.querySelectorAll(
    ".intro-strip > div, .visual-guide-heading, .visual-card, .section-heading, " +
    ".story-card, .meaning-item, .timeline-item, .closing-note"
  );
  cacMuc.forEach(function (muc, i) {
    muc.setAttribute("data-reveal", "");
    /* so le nhẹ cho các thẻ cùng hàng */
    muc.style.setProperty("--d", (i % 3) * 0.08 + "s");
  });

  if ("IntersectionObserver" in window) {
    var theoDoi = new IntersectionObserver(function (ds) {
      ds.forEach(function (d) {
        if (d.isIntersecting) {
          d.target.classList.add("gt-in");
          theoDoi.unobserve(d.target);
        }
      });
    }, { threshold: 0.12 });

    cacMuc.forEach(function (muc) { theoDoi.observe(muc); });
  } else {
    cacMuc.forEach(function (muc) { muc.classList.add("gt-in"); });
  }
})();
(function () {
  "use strict";
  var KHOA_LUU = "gioHangAoDai";
  var gioHang = [];
  var nutGio     = document.getElementById("spCartBtn");
  var nganKeo    = document.getElementById("spDrawer");
  var lopPhu     = document.getElementById("spOverlay");
  var dsGio      = document.getElementById("spList");
  var oTongTien  = document.getElementById("spTotal");
  var nutThanhToan = document.getElementById("spCheckout");
  var nutXoaHet  = document.getElementById("spClear");
  var thongBao   = document.getElementById("spToast");
  var luoi       = document.getElementById("spGrid");
  var nutMenu = document.querySelector(".menu-toggle");
  var menu = document.querySelector(".navbar");
  if (nutMenu && menu) {
    nutMenu.addEventListener("click", function () {
      menu.classList.toggle("show");
    });
  }
  function dinhDangTien(so) {
    return so.toLocaleString("vi-VN") + " đ";
  }
  function thoatHtml(chuoi) {
    return String(chuoi).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function giamChuyenDong() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
  function docGioHang() {
    try {
      var s = localStorage.getItem(KHOA_LUU);
      gioHang = s ? JSON.parse(s) : [];
      if (!Array.isArray(gioHang)) gioHang = [];
    } catch (e) {
      gioHang = [];
    }
  }
  function luuGioHang() {
    try {
      localStorage.setItem(KHOA_LUU, JSON.stringify(gioHang));
    } catch (e) { /* bỏ qua nếu trình duyệt chặn lưu */ }
  }
  var hen;
  function hienThongBao(noiDung) {
    if (!thongBao) return;
    thongBao.textContent = noiDung;
    thongBao.classList.add("show");
    clearTimeout(hen);
    hen = setTimeout(function () {
      thongBao.classList.remove("show");
    }, 2000);
  }
  var idMoiThem = null;
  function veLaiGioHang() {
    var tong = 0;
    dsGio.innerHTML = "";
    if (gioHang.length === 0) {
      dsGio.innerHTML =
        '<li class="sp-empty"><div>🛍️</div><p>Giỏ hàng đang trống.<br>Chọn một tà áo dài bạn thích nhé!</p></li>';
    } else {
      gioHang.forEach(function (sp) {
        tong += sp.gia * sp.soLuong;
        var li = document.createElement("li");
        li.className = "sp-item" + (sp.id === idMoiThem ? " sp-new" : "");
        li.innerHTML =
          '<img src="' + thoatHtml(sp.anh) + '" alt="' + thoatHtml(sp.ten) + '">' +
          '<div class="sp-item-info">' +
            "<strong>" + thoatHtml(sp.ten) + "</strong>" +
            "<span>" + dinhDangTien(sp.gia) + "</span>" +
            '<div class="sp-qty">' +
              '<button type="button" data-act="giam" data-id="' + thoatHtml(sp.id) + '" aria-label="Giảm">−</button>' +
              "<em>" + sp.soLuong + "</em>" +
              '<button type="button" data-act="tang" data-id="' + thoatHtml(sp.id) + '" aria-label="Tăng">+</button>' +
            "</div>" +
          "</div>" +
          '<button type="button" class="sp-del" data-act="xoa" data-id="' + thoatHtml(sp.id) + '" aria-label="Xóa">✕</button>';
        dsGio.appendChild(li);
      });
    }
    idMoiThem = null;
    oTongTien.textContent = dinhDangTien(tong);
    nutThanhToan.classList.toggle("disabled", gioHang.length === 0);
    nutXoaHet.style.display = gioHang.length === 0 ? "none" : "block";
    nutGio.classList.toggle("has-items", gioHang.length > 0);
  }
  function themVaoGio(sp) {
    var daCo = gioHang.find(function (m) { return m.id === sp.id; });
    if (daCo) {
      daCo.soLuong += 1;
    } else {
      gioHang.push({ id: sp.id, ten: sp.ten, gia: sp.gia, anh: sp.anh, soLuong: 1 });
    }
    idMoiThem = sp.id;
    luuGioHang();
    veLaiGioHang();
  }
  function doiSoLuong(id, delta) {
    var sp = gioHang.find(function (m) { return m.id === id; });
    if (!sp) return;
    sp.soLuong += delta;
    if (sp.soLuong <= 0) {
      gioHang = gioHang.filter(function (m) { return m.id !== id; });
    }
    luuGioHang();
    veLaiGioHang();
  }
  function xoaKhoiGio(id) {
    gioHang = gioHang.filter(function (m) { return m.id !== id; });
    luuGioHang();
    veLaiGioHang();
  }
  function moGio() {
    nganKeo.classList.add("open");
    lopPhu.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function dongGio() {
    nganKeo.classList.remove("open");
    lopPhu.classList.remove("open");
    document.body.style.overflow = "";
  }
  nutGio.addEventListener("click", moGio);
  lopPhu.addEventListener("click", dongGio);
  document.getElementById("spClose").addEventListener("click", dongGio);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") dongGio();
  });
  dsGio.addEventListener("click", function (e) {
    var nut = e.target.closest("[data-act]");
    if (!nut) return;
    var id = nut.dataset.id;
    if (nut.dataset.act === "tang") doiSoLuong(id, 1);
    if (nut.dataset.act === "giam") doiSoLuong(id, -1);
    if (nut.dataset.act === "xoa") xoaKhoiGio(id);
  });
  nutXoaHet.addEventListener("click", function () {
    gioHang = [];
    luuGioHang();
    veLaiGioHang();
  });
  function anhBayVaoGio(anhGoc) {
    if (!anhGoc || giamChuyenDong()) {
      nutGio.classList.add("bump");
      setTimeout(function () { nutGio.classList.remove("bump"); }, 500);
      return;
    }
    var a = anhGoc.getBoundingClientRect();
    var b = nutGio.getBoundingClientRect();
    var rong = 100;
    var cao = 125;
    var tamX = a.left + a.width / 2;
    var tamY = a.top + a.height / 2;
    var nguon = anhGoc.currentSrc || anhGoc.src;
    var bay = document.createElement("div");
    bay.className = "sp-fly";
    bay.style.left = tamX - rong / 2 + "px";
    bay.style.top = tamY - cao / 2 + "px";
    bay.style.width = rong + "px";
    bay.style.height = cao + "px";
    bay.style.backgroundImage = 'url("' + nguon + '")';
    document.body.appendChild(bay);
    void bay.offsetWidth; /* ép trình duyệt vẽ trước khi chạy hiệu ứng */
    var dx = b.left + b.width / 2 - tamX;
    var dy = b.top + b.height / 2 - tamY;
    bay.style.transform = "translate(" + dx + "px," + dy + "px) scale(0.18) rotate(18deg)";
    bay.style.opacity = "0.5";

    setTimeout(function () {
      bay.remove();
      nutGio.classList.remove("bump");
      void nutGio.offsetWidth;
      nutGio.classList.add("bump");
      setTimeout(function () { nutGio.classList.remove("bump"); }, 500);
    }, 800);
  }

  function layThongTin(the) {
    return {
      id: the.dataset.id,
      ten: the.dataset.name,
      gia: parseInt(the.dataset.price, 10) || 0,
      anh: the.dataset.img
    };
  }
  luoi.addEventListener("click", function (e) {
    var nut = e.target.closest(".sp-add, .sp-buy");
    if (!nut) return;

    var the = nut.closest(".sp-card");
    var sp = layThongTin(the);

    if (nut.classList.contains("sp-add")) {
      anhBayVaoGio(the.querySelector(".sp-img img"));
      themVaoGio(sp);
      hienThongBao("Đã thêm “" + sp.ten + "” vào giỏ hàng 🛒");
    } else {
      /* Mua ngay: thêm vào giỏ rồi chuyển sang trang Liên hệ để đặt hàng */
      themVaoGio(sp);
      hienThongBao("Đang chuyển sang trang đặt hàng…");
      setTimeout(function () {
        window.location.href = nutThanhToan.getAttribute("href");
      }, 700);
    }
  });
  var nutLoc = document.querySelectorAll(".sp-filter");
  var cacThe = document.querySelectorAll(".sp-card");

  nutLoc.forEach(function (nut) {
    nut.addEventListener("click", function () {
      nutLoc.forEach(function (n) { n.classList.remove("active"); });
      nut.classList.add("active");

      var loai = nut.dataset.filter;
      var stt = 0;

      cacThe.forEach(function (the) {
        var hien = loai === "all" || the.dataset.cat === loai;
        the.classList.toggle("sp-hide", !hien);
        if (hien) {
          /* chạy lại hiệu ứng xuất hiện, so le theo cột */
          the.classList.remove("sp-in");
          void the.offsetWidth;
          the.style.setProperty("--d", (stt % 4) * 0.08 + "s");
          the.classList.add("sp-in");
          stt++;
        }
      });
    });
  });
  cacThe.forEach(function (the, i) {
    the.style.setProperty("--d", (i % 4) * 0.1 + "s");
  });
  if ("IntersectionObserver" in window) {
    var theoDoi = new IntersectionObserver(function (ds) {
      ds.forEach(function (muc) {
        if (muc.isIntersecting) {
          muc.target.classList.add("sp-in");
          theoDoi.unobserve(muc.target);
        }
      });
    }, { threshold: 0.12 });
    cacThe.forEach(function (the) { theoDoi.observe(the); });
  } else {
    cacThe.forEach(function (the) { the.classList.add("sp-in"); });
  }
  docGioHang();
  veLaiGioHang();
})();