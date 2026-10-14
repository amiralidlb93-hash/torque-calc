# TorqueCalc

**A bilingual Persian/English scientific calculator with dark and light themes, keyboard controls, history, and a high-octane racing-inspired UI. Built with vanilla HTML, CSS, and JavaScript.**

ماشین‌حساب علمی دوزبانهٔ فارسی و انگلیسی با تم روشن و تاریک، کنترل صفحه‌کلید و تاریخچه؛ با رابط مسابقه‌ای و بدون وابستگی خارجی.

## Features | امکانات

- Persian and English interface with correct RTL/LTR layout | رابط فارسی و انگلیسی با چینش راست‌چین و چپ‌چین
- Dark and light themes; preferences are saved in the browser | تم تاریک و روشن با ذخیرهٔ انتخاب کاربر
- Standard arithmetic, parentheses, percent, powers, and factorial | محاسبات پایه، پرانتز، درصد، توان و فاکتوریل
- Scientific functions: `sin`, `cos`, `tan`, `sqrt`, `log`, `ln`, `abs` | توابع علمی
- Degree/radian angle toggle | تغییر حالت درجه و رادیان
- Keyboard controls and live calculation preview | کنترل صفحه‌کلید و پیش‌نمایش محاسبه
- Recent calculations stored locally in the browser | ذخیرهٔ تاریخچه در مرورگر
- Responsive, high-contrast racing-inspired UI | رابط واکنش‌گرا با تم مسابقه‌ای
- Safe expression parser; no `eval()` | پردازش امن عبارت‌ها، بدون `eval()`
- No build tools or third-party runtime dependencies | بدون ابزار ساخت یا وابستگی اجرایی خارجی

## Run | اجرا

Open `index.html` in a modern browser, or serve the folder locally:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

فایل `index.html` را با مرورگر باز کن، یا پوشه را با وب‌سرور محلی اجرا کن.

## Controls | کنترل‌ها

| Key | Action | کلید | عملکرد |
| --- | --- | --- | --- |
| `0–9`, `.`, `+ - * / ^ %`, `( )` | Enter expression | اعداد و عملگرها | واردکردن عبارت |
| `Enter` | Calculate | `Enter` | محاسبه |
| `Backspace` | Delete last character | `Backspace` | حذف نویسهٔ آخر |
| `Escape` | Clear | `Escape` | پاک‌کردن |
| `D` | Toggle DEG/RAD | `D` | تغییر درجه/رادیان |

Choose **فا** or **EN** to switch language. Use the sun/moon button to switch themes.  
با دکمه‌های **فا** و **EN** زبان را عوض کن؛ دکمهٔ خورشید/ماه برای تغییر تم است.

Click **SCI / علمی** to reveal scientific functions.  
برای نمایش توابع علمی روی **SCI / علمی** بزن.

## GitHub repository metadata | اطلاعات مخزن

**Repository:** `torque-calc`

**Description:** A bilingual Persian/English scientific calculator with dark/light themes, keyboard controls, history, and a high-octane racing-inspired UI.

**Topics:** `calculator`, `scientific-calculator`, `javascript`, `html`, `css`, `vanilla-js`, `keyboard-shortcuts`, `responsive-design`, `github-pages`, `dark-mode`, `light-mode`, `persian`, `i18n`, `racing-theme`

Ready-to-copy metadata is in [`GITHUB-ABOUT.txt`](GITHUB-ABOUT.txt) and [`REPOSITORY-METADATA.md`](REPOSITORY-METADATA.md).

## GitHub Pages | انتشار در Pages

Publish the repository from the `main` branch and the repository root (`/(root)`) in **Settings → Pages**. The root `index.html` is the site entry point.

برای انتشار، در **Settings → Pages** شاخهٔ `main` و مسیر `/(root)` را انتخاب کن. فایل `index.html` در ریشه، صفحهٔ اصلی سایت است.

## License | مجوز

MIT — see [`LICENSE`](LICENSE). | مجوز MIT — متن کامل در فایل [`LICENSE`](LICENSE) است.
