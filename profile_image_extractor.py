10#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
استخراج کننده عکس پروفایل از Unsplash
این اسکریپت 1000 عکس پروفایل از Unsplash دانلود می‌کند
"""

import requests
import os
import time
import random
from urllib.parse import urlparse
import json
from datetime import datetime

class ProfileImageExtractor:
    def __init__(self, access_key=None, secret_key=None):
        """
        مقداردهی اولیه کلاس
        
        Args:
            access_key (str): کلید API Unsplash (اختیاری)
            secret_key (str): کلید مخفی API Unsplash (اختیاری)
        """
        self.access_key = access_key
        self.secret_key = secret_key
        self.downloaded_count = 0
        self.failed_count = 0
        self.output_dir = "profile_images"
        
        # ایجاد پوشه خروجی
        if not os.path.exists(self.output_dir):
            os.makedirs(self.output_dir)
            
        print(f"📁 پوشه خروجی: {os.path.abspath(self.output_dir)}")
    
    def get_random_profile_images(self, count=1000):
        """
        دریافت لیست تصاویر پروفایل تصادفی از Unsplash
        
        Args:
            count (int): تعداد تصاویر مورد نیاز
            
        Returns:
            list: لیست URL های تصاویر
        """
        images = []
        
        # اگر کلید API موجود باشد، از API استفاده کن
        if self.access_key:
            images = self._get_images_from_api(count)
        else:
            # در غیر این صورت از URL های از پیش تعریف شده استفاده کن
            images = self._get_predefined_images(count)
            
        return images
    
    def _get_images_from_api(self, count):
        """
        جستجو و دریافت تصاویر مردان از API Unsplash
        طبق مستندات: https://unsplash.com/documentation#search-photos
        """
        images = []
        
        print(f"\n🔍 جستجوی {count} تصویر مردان در Unsplash...")
        print(f"📊 محدودیت Demo Mode: 50 درخواست/ساعت")
        
        # محاسبه تعداد صفحات مورد نیاز
        per_page = 30  # حداکثر مجاز طبق مستندات
        total_pages = (count + per_page - 1) // per_page
        
        # شروع از صفحه تصادفی برای تنوع بیشتر
        start_page = random.randint(1, 10)  # از 4587 تصویر موجود
        
        print(f"📄 شروع از صفحه تصادفی: {start_page}")
        print(f"📄 تعداد صفحات مورد نیاز: {total_pages}")
        
        for i in range(total_pages):
            if len(images) >= count:
                break
            
            page = start_page + i
                
            try:
                # طبق مستندات Unsplash
                url = "https://api.unsplash.com/search/photos"
                params = {
                    'query': 'male portrait',
                    'per_page': min(per_page, count - len(images)),
                    'page': page,
                    'orientation': 'portrait',
                    'order_by': 'latest'  # تصاویر جدید برای تنوع
                }
                headers = {
                    'Authorization': f'Client-ID {self.access_key}',
                    'Accept-Version': 'v1'  # طبق مستندات
                }
                
                print(f"\n📡 ارسال درخواست صفحه {page}...")
                response = requests.get(url, params=params, headers=headers, timeout=15)
                
                # بررسی Rate Limit Headers
                rate_limit = response.headers.get('X-Ratelimit-Limit', 'نامشخص')
                rate_remaining = response.headers.get('X-Ratelimit-Remaining', 'نامشخص')
                
                print(f"⚡ Rate Limit: {rate_remaining}/{rate_limit}")
                
                if response.status_code == 403:
                    print(f"\n❌ محدودیت API به پایان رسید!")
                    print(f"💡 شما در Demo Mode هستید (50 درخواست/ساعت)")
                    print(f"⏰ لطفاً یک ساعت صبر کنید یا برای Production درخواست دهید")
                    break
                    
                response.raise_for_status()
                data = response.json()
                
                total_results = data.get('total', 0)
                photos = data.get('results', [])
                
                if not photos:
                    print(f"⚠️ تصویر بیشتری یافت نشد")
                    break
                
                print(f"✅ صفحه {page}: {len(photos)} تصویر یافت شد (از {total_results} تصویر)")
                
                for photo in photos:
                    if len(images) >= count:
                        break
                    
                    photo_id = photo['id']
                    description = photo.get('description') or photo.get('alt_description') or 'بدون توضیح'
                    photographer = photo['user']['name']
                    
                    # استفاده از raw URL با پارامترهای سفارشی
                    base_url = photo['urls']['raw']
                    image_url = f"{base_url}&w=150&h=150&fit=crop&crop=face"
                    images.append(image_url)
                    
                    print(f"  {len(images):3d}. 👤 {photographer} | 📝 {description[:50]}")
                
                # تاخیر بین درخواست‌ها برای احترام به Rate Limit
                if page < total_pages:
                    print(f"⏳ صبر 3 ثانیه...")
                    time.sleep(3)
                
            except requests.exceptions.HTTPError as e:
                print(f"❌ خطای HTTP: {e}")
                if e.response.status_code == 401:
                    print(f"🔑 کلید API نامعتبر است!")
                break
            except Exception as e:
                print(f"❌ خطا: {e}")
                break
        
        print(f"\n✅ مجموع {len(images)} تصویر مرد دریافت شد")
        
        if len(images) == 0:
            print(f"\n💡 راهنمایی:")
            print(f"   1. کلید API شما در Demo Mode است (50 درخواست/ساعت)")
            print(f"   2. برای Production Mode به این لینک مراجعه کنید:")
            print(f"      https://unsplash.com/oauth/applications/{self.access_key.split('-')[0]}")
        
        return images[:count]
    
    def _get_predefined_images(self, count):
        """
        پیام به کاربر درباره محدودیت API
        """
        print(f"\n❌ متأسفانه API Unsplash به محدودیت رسیده است.")
        print(f"💡 لطفاً چند دقیقه صبر کنید و دوباره امتحان کنید.")
        print(f"🔄 یا می‌توانید تعداد کمتری تصویر درخواست دهید.")
        return []
    
    def download_image(self, url, filename):
        """
        دانلود یک تصویر
        
        Args:
            url (str): URL تصویر
            filename (str): نام فایل برای ذخیره
            
        Returns:
            bool: موفقیت یا عدم موفقیت دانلود
        """
        try:
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
            
            response = requests.get(url, headers=headers, timeout=30)
            response.raise_for_status()
            
            # بررسی نوع فایل
            content_type = response.headers.get('content-type', '')
            if 'image' not in content_type:
                print(f"⚠️ فایل {filename} تصویر نیست: {content_type}")
                return False
            
            # ذخیره فایل
            filepath = os.path.join(self.output_dir, filename)
            with open(filepath, 'wb') as f:
                f.write(response.content)
            
            return True
            
        except requests.exceptions.RequestException as e:
            print(f"❌ خطا در دانلود {filename}: {e}")
            return False
        except Exception as e:
            print(f"❌ خطای غیرمنتظره در دانلود {filename}: {e}")
            return False
    
    def extract_images(self, count=1000):
        """
        استخراج و دانلود تصاویر پروفایل
        
        Args:
            count (int): تعداد تصاویر برای دانلود
        """
        print(f"🚀 شروع استخراج {count} عکس پروفایل...")
        print(f"⏰ زمان شروع: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        
        # دریافت لیست تصاویر
        images = self.get_random_profile_images(count)
        
        if not images:
            print("❌ هیچ تصویری دریافت نشد!")
            return
        
        print(f"📋 {len(images)} تصویر برای دانلود آماده شد")
        
        # دانلود تصاویر
        for i, image_url in enumerate(images, 1):
            filename = f"profile_{i:04d}.jpg"
            
            print(f"📥 دانلود {i}/{len(images)}: {filename}")
            
            if self.download_image(image_url, filename):
                self.downloaded_count += 1
                print(f"✅ {filename} دانلود شد")
            else:
                self.failed_count += 1
                print(f"❌ دانلود {filename} ناموفق بود")
            
            # نمایش پیشرفت
            if i % 10 == 0:
                progress = (i / len(images)) * 100
                print(f"📊 پیشرفت: {progress:.1f}% ({i}/{len(images)})")
            
            # تاخیر کوتاه برای جلوگیری از محدودیت سرور
            time.sleep(0.1)
        
        # خلاصه نتایج
        self.print_summary()
    
    def print_summary(self):
        """چاپ خلاصه نتایج"""
        print("\n" + "="*50)
        print("📊 خلاصه نتایج:")
        print(f"✅ تصاویر دانلود شده: {self.downloaded_count}")
        print(f"❌ تصاویر ناموفق: {self.failed_count}")
        print(f"📁 پوشه خروجی: {os.path.abspath(self.output_dir)}")
        print(f"⏰ زمان پایان: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print("="*50)

def main():
    """تابع اصلی"""
    print("🎯 استخراج کننده عکس پروفایل از Unsplash")
    print("="*50)
    
    # استفاده از کلید API جدید
    access_key = "y1BbOGZx94uON-JzbSLYOGZgVa-y0QVFjVln7yniEeo"
    secret_key = "gfNshium1otWVQbCa14MP4AqiQcdcOQ_YxhJQbBWTGQ"
    
    print("✅ کلید API جدید Unsplash یافت شد!")
    print(f"🔑 Application ID: 814174")
    print(f"🔑 Access Key: {access_key[:10]}...")
    
    # ایجاد نمونه کلاس
    extractor = ProfileImageExtractor(access_key, secret_key)
    
    # دریافت تعداد تصاویر
    try:
        count = int(input("🔢 تعداد تصاویر برای دانلود (پیش‌فرض: 1000): ") or "1000")
    except ValueError:
        count = 1000
        print("⚠️ ورودی نامعتبر، استفاده از مقدار پیش‌فرض: 1000")
    
    # شروع استخراج
    extractor.extract_images(count)

if __name__ == "__main__":
    main()
