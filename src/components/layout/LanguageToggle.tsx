
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const LanguageToggle = () => {
  const { language, t } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <ToggleGroup 
        type="single" 
        value={language} 
        // Xóa onValueChange để vô hiệu hóa chức năng chuyển đổi ngôn ngữ
        // Giá trị cố định là giá trị hiện tại
      >
        <ToggleGroupItem value="en" className="text-xs px-2 cursor-not-allowed opacity-70">
          {t('english')}
        </ToggleGroupItem>
        <ToggleGroupItem value="vi" className="text-xs px-2 cursor-not-allowed opacity-70">
          {t('vietnamese')}
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default LanguageToggle;
