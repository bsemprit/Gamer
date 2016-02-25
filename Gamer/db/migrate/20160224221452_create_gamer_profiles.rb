class CreateGamerProfiles < ActiveRecord::Migration
  def change
    create_table :gamer_profiles do |t|
      t.references :user, index: true, foreign_key: true
      t.references :game, index: true, foreign_key: true
      t.integer :highscore
      t.integer :cumulative_score

      t.timestamps null: false
    end
  end
end
