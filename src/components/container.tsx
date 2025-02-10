import { cn } from '@/lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        'h-full mx-auto w-full max-w-screen-xxl px-2.5 md:px-20',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default Container;
