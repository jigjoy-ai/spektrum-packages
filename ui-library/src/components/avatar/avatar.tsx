import { FC } from "react"

interface AvatarProps {
	image: string
	alt?: string
}

const Avatar: FC<AvatarProps> = ({ image, alt = "Image" }: AvatarProps) => {
	return (
		<div className="cursor-pointer text-secondary hover:text-gray-300 flex items-center gap-2">
			<img src={image} alt={alt} className={`w-8 h-8 rounded-full object-cover border border-secondary`} />
		</div>
	)
}

Avatar.displayName = "Avatar"

export { Avatar }
