# راهنمای استفاده از Unsplash API

## مشکل فعلی

کلید API شما **50 درخواست در ساعت** محدودیت دارد و تمام شده است:
```
⚡ Rate Limit: 0/50
```

## راه‌حل‌ها

### 1️⃣ صبر کنید (آسان‌ترین)
- محدودیت بعد از **1 ساعت** ریست می‌شود
- می‌توانید **یک ساعت دیگر** دوباره امتحان کنید

### 2️⃣ درخواست Production Mode (توصیه می‌شود)

#### مراحل:

1. به این لینک بروید:
   ```
   https://unsplash.com/oauth/applications/675240
   ```

2. روی دکمه **"Apply for Production"** کلیک کنید

3. فرم را پر کنید:
   - توضیح دهید که برای چه استفاده می‌کنید
   - نحوه attribution عکاس‌ها را شرح دهید
   - لینک پروژه خود را بدهید

4. اگر تایید شود، محدودیت شما از **50/ساعت** به **5000/ساعت** افزایش می‌یابد!

### 3️⃣ کلید API جدید (موقت)

می‌توانید یک Application جدید بسازید:

1. برو به: https://unsplash.com/oauth/applications
2. روی **"New Application"** کلیک کن
3. فرم را پر کن و کلید جدید دریافت کن
4. این کلید هم 50 درخواست/ساعت دارد

### 4️⃣ استفاده بهینه از API

برای دانلود 1000 تصویر با محدودیت 50/ساعت:

```python
# محاسبه: 1000 تصویر / 30 تصویر در هر درخواست = 34 درخواست
# با محدودیت 50/ساعت، می‌توانید 30*50 = 1500 تصویر در ساعت دانلود کنید

python profile_image_extractor.py
# و وقتی تعداد بخواهد: 1000
```

## مستندات Unsplash

- 📚 [Search Photos API](https://unsplash.com/documentation#search-photos)
- 📊 [Rate Limiting](https://unsplash.com/documentation#rate-limiting)
- 🔑 [Apply for Production](https://unsplash.com/documentation#creating-a-developer-account)

## کد فعلی شما

کد شما کاملاً درست است و طبق مستندات پیاده‌سازی شده:

✅ استفاده صحیح از `/search/photos` endpoint  
✅ پارامترهای `query`, `per_page`, `orientation`  
✅ هدر `Accept-Version: v1`  
✅ نمایش `Rate Limit` headers  
✅ جستجو و نمایش نتایج  

فقط باید **یک ساعت صبر کنید** یا **برای Production درخواست دهید**.

