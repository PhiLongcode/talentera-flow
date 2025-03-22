
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  DollarSign, 
  Briefcase, 
  Clock, 
  Tags, 
  ChevronDown,
  X
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';

// Sample location options
const locations = [
  'Hà Nội', 
  'TP. Hồ Chí Minh', 
  'Đà Nẵng', 
  'Hải Phòng', 
  'Cần Thơ',
  'Remote'
];

// Sample job type options
const jobTypes = [
  'Toàn thời gian', 
  'Bán thời gian', 
  'Hợp đồng', 
  'Thực tập', 
  'Từ xa'
];

// Sample experience levels
const experienceLevels = [
  'Mới đi làm (0-1 năm)',
  'Nhân viên (1-3 năm)',
  'Có kinh nghiệm (3-5 năm)',
  'Chuyên gia (5-10 năm)',
  'Cấp cao (10+ năm)'
];

// Sample skills for tags
const popularSkills = [
  'React', 
  'JavaScript', 
  'TypeScript', 
  'Node.js', 
  'UI/UX', 
  'Python', 
  'Java', 
  'Blockchain', 
  'AI/ML', 
  'DevOps'
];

const JobFilters = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [salaryRange, setSalaryRange] = useState([0, 100]);
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [isFilterExpanded, setIsFilterExpanded] = useState(true);

  // Toggle location selection
  const toggleLocation = (location: string) => {
    if (selectedLocations.includes(location)) {
      setSelectedLocations(selectedLocations.filter(loc => loc !== location));
    } else {
      setSelectedLocations([...selectedLocations, location]);
    }
  };

  // Toggle job type selection
  const toggleJobType = (type: string) => {
    if (selectedJobTypes.includes(type)) {
      setSelectedJobTypes(selectedJobTypes.filter(t => t !== type));
    } else {
      setSelectedJobTypes([...selectedJobTypes, type]);
    }
  };

  // Toggle experience level selection
  const toggleExperience = (exp: string) => {
    if (selectedExperience.includes(exp)) {
      setSelectedExperience(selectedExperience.filter(e => e !== exp));
    } else {
      setSelectedExperience([...selectedExperience, exp]);
    }
  };

  // Add/remove skill tags
  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedLocations([]);
    setSalaryRange([0, 100]);
    setSelectedJobTypes([]);
    setSelectedExperience([]);
    setSelectedSkills([]);
    setVerifiedOnly(false);
  };

  // Count active filters
  const activeFilterCount = 
    (searchTerm ? 1 : 0) + 
    selectedLocations.length + 
    (salaryRange[0] > 0 || salaryRange[1] < 100 ? 1 : 0) + 
    selectedJobTypes.length + 
    selectedExperience.length +
    selectedSkills.length +
    (verifiedOnly ? 1 : 0);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="glass-card sticky top-24">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <h3 className="font-medium text-lg">Bộ lọc</h3>
              {activeFilterCount > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {activeFilterCount}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              {activeFilterCount > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={resetFilters}
                  className="text-xs h-7 px-2"
                >
                  <X className="w-3 h-3 mr-1" />
                  Reset
                </Button>
              )}
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsFilterExpanded(!isFilterExpanded)}
                className="h-7 w-7 rounded-full"
              >
                <ChevronDown className={`w-4 h-4 transition-transform ${isFilterExpanded ? 'rotate-180' : ''}`} />
              </Button>
            </div>
          </div>

          {isFilterExpanded && (
            <div className="space-y-5">
              {/* Search input */}
              <div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Tìm kiếm theo chức danh, từ khóa..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Location filter */}
              <div>
                <h4 className="flex items-center text-sm font-medium mb-2">
                  <MapPin className="w-4 h-4 mr-2" />
                  Địa điểm
                </h4>
                <div className="flex flex-wrap gap-2">
                  {locations.map((location) => (
                    <Badge
                      key={location}
                      variant={selectedLocations.includes(location) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleLocation(location)}
                    >
                      {location}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Salary range filter */}
              <div>
                <h4 className="flex items-center text-sm font-medium mb-2">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Mức lương (triệu VNĐ)
                </h4>
                <div className="px-1 pb-1">
                  <Slider
                    value={salaryRange}
                    onValueChange={setSalaryRange}
                    min={0}
                    max={100}
                    step={1}
                    className="my-4"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{salaryRange[0]} triệu</span>
                    <span>{salaryRange[1]} triệu+</span>
                  </div>
                </div>
              </div>

              {/* Job type filter */}
              <div>
                <h4 className="flex items-center text-sm font-medium mb-2">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Loại công việc
                </h4>
                <div className="flex flex-wrap gap-2">
                  {jobTypes.map((type) => (
                    <Badge
                      key={type}
                      variant={selectedJobTypes.includes(type) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleJobType(type)}
                    >
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Experience level filter */}
              <div>
                <h4 className="flex items-center text-sm font-medium mb-2">
                  <Clock className="w-4 h-4 mr-2" />
                  Kinh nghiệm
                </h4>
                <div className="space-y-2">
                  {experienceLevels.map((exp) => (
                    <div 
                      key={exp} 
                      className={`px-3 py-2 rounded-md text-sm cursor-pointer transition-colors ${
                        selectedExperience.includes(exp) 
                          ? 'bg-primary/10 text-primary' 
                          : 'hover:bg-secondary'
                      }`}
                      onClick={() => toggleExperience(exp)}
                    >
                      {exp}
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills filter */}
              <div>
                <h4 className="flex items-center text-sm font-medium mb-2">
                  <Tags className="w-4 h-4 mr-2" />
                  Kỹ năng
                </h4>
                <div className="flex flex-wrap gap-2">
                  {popularSkills.map((skill) => (
                    <Badge
                      key={skill}
                      variant={selectedSkills.includes(skill) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleSkill(skill)}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Blockchain verified toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Xác thực blockchain</span>
                  <Badge variant="outline" className="text-xs">Mới</Badge>
                </div>
                <Switch 
                  checked={verifiedOnly}
                  onCheckedChange={setVerifiedOnly}
                />
              </div>
              
              {/* Apply filters button - visible on mobile */}
              <div className="pt-2 lg:hidden">
                <Button className="w-full rounded-full button-glow">
                  Áp dụng bộ lọc
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default JobFilters;
