class Game < ActiveRecord::Base
	has_many :users, through: :GamerProfile
	mount_uploader :game_image, GameImageUploader
end
