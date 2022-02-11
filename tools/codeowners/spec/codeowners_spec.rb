require 'codeowners'

describe CodeOwners do

  subject { CodeOwners.new('spec/fixtures/codeowners.txt') }

  describe 'File scanning' do

    context 'given initialize with the codeowners file' do
      it 'returns a pattern, an organisation name and owner' do

        expect(subject).not_to be_nil
      end
    end

    context 'given owner with no given path' do
      it 'returns nil' do

        expect(subject.owner('')).to be_nil
      end
    end

    context 'given all_owners' do
      it 'returns a list of all owners' do

        expect(subject.all_owners.count).to eq(6)
      end
    end

  end
end
