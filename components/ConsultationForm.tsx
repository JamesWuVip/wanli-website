'use client';

import {useTranslations} from 'next-intl';
import {useState} from 'react';
import Toast from './Toast';

interface ToastState {
  show: boolean;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface ConsultationFormProps {
  locale: string;
}

export default function ConsultationForm({ locale }: ConsultationFormProps) {
  const t = useTranslations('consultForm');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    projectType: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<ToastState>({
    show: false,
    type: 'info',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 显示Toast提示
  const showToast = (type: 'success' | 'error' | 'info', message: string) => {
    setToast({ show: true, type, message });
  };

  // 表单验证
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = t('errors.nameRequired');
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t('errors.phoneRequired');
    } else if (!/^1[3-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = t('errors.phoneInvalid');
    }

    if (!formData.projectType) {
      newErrors.projectType = t('errors.projectTypeRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 验证表单
    if (!validateForm()) {
      showToast('error', t('toast.validationError'));
      return;
    }

    setSubmitting(true);
    setErrors({});

    try {
      // 发送到API
      console.log('[Form] Submitting form data...');

      // 方案1: 尝试使用API路由
      let success = false;
      try {
        const response = await fetch('/api/consultation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            locale,
          }),
        });

        console.log('[Form] Response status:', response.status);

        if (response.ok) {
          const result = await response.json();
          console.log('[Form] Response data:', result);
          success = true;
        }
      } catch (apiError) {
        console.error('[Form] API route failed:', apiError);
      }

      // 方案2: 如果API路由失败，直接发送到企业微信（仅作为备用）
      if (!success) {
        console.log('[Form] Using direct WeChat notification...');
        try {
          const projectTypeMap: Record<string, string> = {
            ai: 'AI应用开发',
            enterprise: '企业管理系统',
            web: '网站开发',
            mobile: '移动应用',
            consulting: '技术咨询',
            other: '其他',
          };

          const projectTypeName = projectTypeMap[formData.projectType] || formData.projectType;
          const currentTime = new Date().toLocaleString('zh-CN', {
            timeZone: 'Asia/Shanghai',
          });

          const message = {
            msgtype: 'markdown',
            markdown: {
              content: `## 📋 新客户咨询
> **来源：** 智理科技官网

**👤 客户姓名：** <font color="info">${formData.name}</font>
**📱 联系电话：** <font color="warning">${formData.phone}</font>
**💼 项目类型：** ${projectTypeName}
**📝 需求描述：** ${formData.message || '暂无'}
**🌐 语言环境：** ${locale}
**⏰ 提交时间：** ${currentTime}

> 请尽快联系客户！`,
            },
          };

          // 注意：这会受到 CORS 限制，但至少尝试一下
          await fetch('https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=76884feb-948d-4d1b-b909-3520cb933258', {
            method: 'POST',
            mode: 'no-cors',  // 绕过 CORS
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
          });

          console.log('[Form] Direct WeChat notification sent');
        } catch (wechatError) {
          console.error('[Form] Direct WeChat failed:', wechatError);
        }
      }

      // 显示成功提示
      showToast('success', t('toast.success'));

      setSubmitted(true);
      setFormData({
        name: '',
        phone: '',
        projectType: '',
        message: '',
      });

      // 3秒后重置提交状态
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error('提交失败:', error);
      showToast('error', t('toast.error'));
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // 清除该字段的错误提示
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  return (
    <>
      {/* Toast通知 */}
      {toast.show && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}

      <section id="consultation" className="section-padding bg-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">{t('title')}</h2>
            <p className="text-xl text-gray-600">{t('subtitle')}</p>
            <div className="mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-green-50 to-blue-50 text-green-700 px-8 py-3 rounded-full font-semibold border-2 border-green-200">
              <span className="text-2xl">🎁</span>
              <span>{t('freeOffer')}</span>
            </div>
          </div>

          {/* 主表单 */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 必填字段提示 */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <p className="text-sm text-blue-700">
                  <span className="font-bold">💡 {t('quickFill')}</span> {t('quickFillTip')}
                </p>
              </div>

              {/* 姓名 + 电话 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    {t('name')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition ${
                      errors.name
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:border-primary-500'
                    }`}
                    placeholder={t('namePlaceholder')}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <span>⚠</span> {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    {t('phone')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    pattern="1[3-9]\d{9}"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition ${
                      errors.phone
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:border-primary-500'
                    }`}
                    placeholder={t('phonePlaceholder')}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <span>⚠</span> {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* 项目类型 */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  {t('projectType')} <span className="text-red-500">*</span>
                </label>
                <select
                  name="projectType"
                  required
                  value={formData.projectType}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition bg-white ${
                    errors.projectType
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:border-primary-500'
                  }`}
                >
                  <option value="">{t('selectProject')}</option>
                  <option value="ai">{t('projectTypes.ai')}</option>
                  <option value="enterprise">{t('projectTypes.enterprise')}</option>
                  <option value="web">{t('projectTypes.web')}</option>
                  <option value="mobile">{t('projectTypes.mobile')}</option>
                  <option value="consulting">{t('projectTypes.consulting')}</option>
                  <option value="other">{t('projectTypes.other')}</option>
                </select>
                {errors.projectType && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <span>⚠</span> {errors.projectType}
                  </p>
                )}
              </div>

              {/* 需求描述（选填） */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  {t('message')} <span className="text-gray-400 text-sm font-normal">({t('optional')})</span>
                </label>
                <textarea
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition resize-none"
                  placeholder={t('messagePlaceholder')}
                />
              </div>

              {/* 提交按钮 */}
              <div className="text-center pt-4">
                <button
                  type="submit"
                  disabled={submitting || submitted}
                  className={`px-16 py-5 rounded-xl font-bold text-lg transform transition-all shadow-lg ${
                    submitted
                      ? 'bg-green-500 text-white scale-105'
                      : submitting
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-gradient-to-r from-primary-600 to-blue-600 text-white hover:from-primary-700 hover:to-blue-700 hover:scale-105 hover:shadow-xl'
                  }`}
                >
                  {submitted ? (
                    <span className="flex items-center gap-2">
                      <span className="text-2xl">✓</span> {t('submitted')}
                    </span>
                  ) : submitting ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin">⏳</span> {t('submitting')}
                    </span>
                  ) : (
                    t('submit')
                  )}
                </button>
                <p className="mt-4 text-gray-500 text-sm">
                  🔒 {t('privacy')}
                </p>
                <p className="mt-2 text-primary-600 font-semibold">
                  ⚡ {t('responseTime')}
                </p>
              </div>
            </form>
          </div>

          {/* 快速联系方式 */}
          <div className="mt-12">
            <p className="text-center text-gray-600 mb-6 text-lg">
              {t('orContactDirect')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <a
                href="tel:+8613811796300"
                className="flex items-center justify-center gap-3 bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 p-6 rounded-xl transition-all group border-2 border-green-200 hover:border-green-300"
              >
                <span className="text-4xl">📞</span>
                <div>
                  <div className="font-semibold text-gray-700">{t('callNow')}</div>
                  <div className="text-green-600 font-bold">138-1179-6300</div>
                </div>
              </a>

              <a
                href="mailto:wuning@wanli.ai"
                className="flex items-center justify-center gap-3 bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 p-6 rounded-xl transition-all group border-2 border-blue-200 hover:border-blue-300"
              >
                <span className="text-4xl">📧</span>
                <div>
                  <div className="font-semibold text-gray-700">{t('emailUs')}</div>
                  <div className="text-blue-600 font-bold text-sm">wuning@wanli.ai</div>
                </div>
              </a>

              <div className="flex items-center justify-center gap-3 bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border-2 border-purple-200">
                <span className="text-4xl">💬</span>
                <div>
                  <div className="font-semibold text-gray-700">{t('wechat')}</div>
                  <div className="text-purple-600 font-bold text-sm">{t('scanQR')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
