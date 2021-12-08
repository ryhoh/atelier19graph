from flask import Flask, render_template
import json
import pandas as pd


app = Flask(__name__)


df = pd.read_csv('data/categories.csv')
categories = df['カテゴリ'].values.tolist()
df = pd.read_csv('data/materials.csv')
materials = df['素材名'].values.tolist()
df = pd.read_csv('data/material_category.csv')
material_category = df.values.tolist()


@app.route('/')
def hello():
    return render_template('index.html')

@app.route('/json')
def ret_json():
    return json.dumps({
        'categories': categories,
        'materials': materials,
        'material_category': material_category,
    }, ensure_ascii=False)


if __name__ == "__main__":
    app.run(debug=True)
