from flask import Flask, request, jsonify
import openai
import os

app = Flask(__name__)

# Load OpenAI API key from environment variables
openai.api_key = os.getenv("OPENAI_API_KEY")

@app.route('/generate', methods=['POST'])
def generate_contract():
    data = request.json
    description = data['description']

    # Call OpenAI API to generate smart contract code
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=f"Generate a smart contract in Solidity based on the following description: {description}",
        max_tokens=150
    )

    contract_code = response.choices[0].text.strip()
    return jsonify({'contract_code': contract_code})

if __name__ == '__main__':
    app.run(debug=True)
