import { LucideIcon } from 'lucide-react';
import { Button } from '../ui/button';

type MenuItemProps = {
  icon?: LucideIcon;
  title?: string;
  action?: () => void;
  isActive?: (() => boolean) | null;
  floating?: boolean;
};

export default function MenuItem({
  icon: Icon,
  title,
  action,
  isActive = null,
}: MenuItemProps) {
  return (
    <Button
      type='button'
      onClick={action}
      title={title}
      variant={isActive && isActive() ? 'default' : 'ghost'}
      size='icon'
      className='border-none'
      
    >
      {Icon && <Icon size={18} />}
    </Button>
  );
}
