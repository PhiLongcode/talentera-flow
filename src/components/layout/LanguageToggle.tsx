
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const LanguageToggle = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <ToggleGroup type="single" value={language} onValueChange={(value) => value && setLanguage(value as 'en' | 'vi')}>
        <ToggleGroupItem value="en" className="text-xs px-2">
          {t('english')}
        </ToggleGroupItem>
        <ToggleGroupItem value="vi" className="text-xs px-2">
          {t('vietnamese')}
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default LanguageToggle;
