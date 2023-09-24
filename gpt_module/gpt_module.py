from transformers import GPT2Tokenizer, GPT2LMHeadModel
import torch

class GPT_MODULE:
  
  # You can use other models like gpt2-medium, gpt2-large, etc.
  def __init__(self, model_name = "gpt2"):
    self.device = "cuda" if torch.cuda.is_available() else "cpu"

    # Load pre-trained GPT-2 model and tokenizer
    self.model = GPT2LMHeadModel.from_pretrained(model_name)
    _ = self.model.to(self.device)
    self.tokenizer = GPT2Tokenizer.from_pretrained(model_name)


  def generate_text(self, user_input = ""):
    # If user input is not provided
    if user_input == "":
      output = "Please give some text to generate reponse"
      print(output)
      return output
    
    # Tokenize the input text
    input_ids = self.tokenizer.encode(user_input, return_tensors="pt").to(self.device)

    # Set attention mask to 1 for all input tokens
    attention_mask = torch.ones_like(input_ids).to(self.device)

    # Generate text
    output = self.model.generate(input_ids=input_ids, max_new_tokens = 300,
                            attention_mask=attention_mask,
                            pad_token_id=self.tokenizer.eos_token_id,
                            repetition_penalty=1.2, no_repeat_ngram_size=5)
    
    # Decode the generated text
    generated_text = self.tokenizer.decode(output[0], skip_special_tokens=True)

    # Exclude user input from the generated text
    generated_text = generated_text.replace(user_input, "")

    return generated_text