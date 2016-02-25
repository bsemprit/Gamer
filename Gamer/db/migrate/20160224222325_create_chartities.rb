class CreateChartities < ActiveRecord::Migration
  def change
    create_table :chartities do |t|
      t.string :name
      t.string :email
      t.string :address
      t.text :description

      t.timestamps null: false
    end
  end
end
