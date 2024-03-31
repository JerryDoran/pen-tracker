import { Avatar, AvatarImage } from '@/components/ui/avatar';

type BotAvatarProps = {
  src: string;
};

export default function BotAvatar({ src }: BotAvatarProps) {
  return (
    <Avatar className='w-12 h-12'>
      <AvatarImage src={src} />
    </Avatar>
  );
}
