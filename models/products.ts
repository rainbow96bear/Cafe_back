import { Model, DataTypes, Sequelize } from "sequelize";

export default class Products extends Model {
  public fileName!: string;
  public productType!: string;
  public productKind!: string;
  public producName!: string;
  public price!: number;
  public info!: Text;

  public static initModel(sequelize: Sequelize) {
    return Products.init(
      {
        fileName: { type: DataTypes.STRING, allowNull: false },
        productType: { type: DataTypes.STRING, allowNull: false },
        productKind: { type: DataTypes.STRING, allowNull: false },
        productName: { type: DataTypes.STRING, allowNull: false, unique: true },
        price: { type: DataTypes.INTEGER, allowNull: false },
        info: { type: DataTypes.TEXT, allowNull: false },
      },
      {
        sequelize,
        modelName: "Products",
        collate: "utf8_general_ci",
      }
    );
  }

  public static associate(db: any) {}
}
