class CreateSpaceInvaders < ActiveRecord::Migration
  def change
    create_table :space_invaders do |t|

      t.timestamps null: false
    end
  end
end
